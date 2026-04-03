import { useState, useEffect, useCallback } from 'react';
import {
  initialize,
  requestPermission,
  getSdkStatus,
  SdkAvailabilityStatus,
  readRecords,
  aggregateRecord,
  aggregateGroupByPeriod,
  openHealthConnectSettings,
} from 'react-native-health-connect';
import { Linking, Platform } from 'react-native';

const HEALTH_CONNECT_URL =
  'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata&hl=en_IN';

const useHealthConnect = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sdkAvailable, setSdkAvailable] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [healthData, setHealthData] = useState({
    steps: 0,
    calories: 0,
    activeCalories: 0,
    heartRate: null,
    heartRateMin: null,
    heartRateMax: null,
    heartRateAvg: null,
    distance: 0,
    sleepDuration: 0,
    floorsClimbed: 0,
    exerciseMinutes: 0,
  });
  const [error, setError] = useState(null);

  const getTodayRange = () => {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    return {
      startTime: startOfDay.toISOString(),
      endTime: now.toISOString(),
    };
  };

  const getDateRange = date => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return {
      startTime: startOfDay.toISOString(),
      endTime: endOfDay.toISOString(),
    };
  };

  const getSleepRange = () => {
    const now = new Date();
    const startOfYesterday = new Date(now);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setHours(20, 0, 0, 0);

    const endOfToday = new Date(now);
    endOfToday.setHours(12, 0, 0, 0);

    return {
      startTime: startOfYesterday.toISOString(),
      endTime: endOfToday.toISOString(),
    };
  };

  const init = useCallback(async () => {
    try {
      await initialize();
      setIsInitialized(true);
      return true;
    } catch (err) {
      console.error('Failed to initialize Health Connect:', err);
      setError('Failed to initialize Health Connect');
      return false;
    }
  }, []);

  const checkSdkStatus = useCallback(async () => {
    try {
      const status = await getSdkStatus();
      const isAvailable = status === SdkAvailabilityStatus.SDK_AVAILABLE;
      setSdkAvailable(isAvailable);
      return isAvailable;
    } catch (err) {
      console.error('Error checking SDK status:', err);
      setSdkAvailable(false);
      return false;
    }
  }, []);

  const requestHealthPermissions = useCallback(async () => {
    try {
      const permissions = await requestPermission([
        { accessType: 'read', recordType: 'TotalCaloriesBurned' },
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'HeartRate' },
        { accessType: 'read', recordType: 'Distance' },
        { accessType: 'read', recordType: 'SleepSession' },
        { accessType: 'read', recordType: 'FloorsClimbed' },
        { accessType: 'read', recordType: 'ExerciseSession' },
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      ]);
      const granted = permissions.length > 0;
      setPermissionsGranted(granted);
      return granted;
    } catch (err) {
      console.error('Error requesting permissions:', err);
      setPermissionsGranted(false);
      return false;
    }
  }, []);

  const fetchStepsAggregate = async (startTime, endTime) => {
    try {
      const result = await aggregateRecord({
        recordType: 'Steps',
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });
      return result.COUNT_TOTAL || 0;
    } catch (err) {
      console.error('Error fetching steps:', err);
      return 0;
    }
  };

  const fetchCaloriesAggregate = async (startTime, endTime) => {
    try {
      const result = await aggregateRecord({
        recordType: 'TotalCaloriesBurned',
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });
      return Math.round(result.inKilocalories || 0);
    } catch (err) {
      console.error('Error fetching calories:', err);
      return 0;
    }
  };

  const fetchActiveCaloriesAggregate = async (startTime, endTime) => {
    try {
      const result = await aggregateRecord({
        recordType: 'ActiveCaloriesBurned',
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });
      return Math.round(result.inKilocalories || 0);
    } catch (err) {
      console.error('Error fetching active calories:', err);
      return 0;
    }
  };

  const fetchDistanceAggregate = async (startTime, endTime) => {
    try {
      const result = await aggregateRecord({
        recordType: 'Distance',
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });
      const meters = result.inMeters || 0;
      return Math.round(meters / 10) / 100;
    } catch (err) {
      console.error('Error fetching distance:', err);
      return 0;
    }
  };

  const fetchFloorsAggregate = async (startTime, endTime) => {
    try {
      const result = await aggregateRecord({
        recordType: 'FloorsClimbed',
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });
      return result.COUNT_TOTAL || 0;
    } catch (err) {
      console.error('Error fetching floors:', err);
      return 0;
    }
  };

  const fetchHeartRateRecords = async (startTime, endTime) => {
    try {
      const { records } = await readRecords('HeartRate', {
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });

      if (!records || records.length === 0) {
        return { current: null, min: null, max: null, avg: null };
      }

      const allSamples = records.flatMap(r => r.samples || []);
      if (allSamples.length === 0) {
        return { current: null, min: null, max: null, avg: null };
      }

      const bpmValues = allSamples.map(s => s.beatsPerMinute).filter(Boolean);
      const current = bpmValues[bpmValues.length - 1] || null;
      const min = Math.min(...bpmValues);
      const max = Math.max(...bpmValues);
      const avg = Math.round(
        bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length,
      );

      return { current, min, max, avg };
    } catch (err) {
      console.error('Error fetching heart rate:', err);
      return { current: null, min: null, max: null, avg: null };
    }
  };

  const fetchSleepRecords = async (startTime, endTime) => {
    try {
      const { records } = await readRecords('SleepSession', {
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });

      if (!records || records.length === 0) return 0;

      let totalMinutes = 0;
      records.forEach(record => {
        const start = new Date(record.startTime);
        const end = new Date(record.endTime);
        totalMinutes += (end - start) / (1000 * 60);
      });

      return Math.round(totalMinutes);
    } catch (err) {
      console.error('Error fetching sleep:', err);
      return 0;
    }
  };

  const fetchExerciseRecords = async (startTime, endTime) => {
    try {
      const { records } = await readRecords('ExerciseSession', {
        timeRangeFilter: {
          operator: 'between',
          startTime,
          endTime,
        },
      });

      if (!records || records.length === 0) return 0;

      let totalMinutes = 0;
      records.forEach(record => {
        const start = new Date(record.startTime);
        const end = new Date(record.endTime);
        totalMinutes += (end - start) / (1000 * 60);
      });

      return Math.round(totalMinutes);
    } catch (err) {
      console.error('Error fetching exercise:', err);
      return 0;
    }
  };

  const fetchAllHealthData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { startTime, endTime } = getTodayRange();
      const sleepRange = getSleepRange();

      const [
        steps,
        calories,
        activeCalories,
        heartRateData,
        distance,
        sleepDuration,
        floorsClimbed,
        exerciseMinutes,
      ] = await Promise.all([
        fetchStepsAggregate(startTime, endTime),
        fetchCaloriesAggregate(startTime, endTime),
        fetchActiveCaloriesAggregate(startTime, endTime),
        fetchHeartRateRecords(startTime, endTime),
        fetchDistanceAggregate(startTime, endTime),
        fetchSleepRecords(sleepRange.startTime, sleepRange.endTime),
        fetchFloorsAggregate(startTime, endTime),
        fetchExerciseRecords(startTime, endTime),
      ]);

      setHealthData({
        steps,
        calories,
        activeCalories,
        heartRate: heartRateData.current,
        heartRateMin: heartRateData.min,
        heartRateMax: heartRateData.max,
        heartRateAvg: heartRateData.avg,
        distance,
        sleepDuration,
        floorsClimbed,
        exerciseMinutes,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching health data:', err);
      setError('Failed to fetch health data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHealthDataForDate = useCallback(async date => {
    try {
      const { startTime, endTime } = getDateRange(date);

      const sleepStartTime = new Date(date);
      sleepStartTime.setDate(sleepStartTime.getDate() - 1);
      sleepStartTime.setHours(20, 0, 0, 0);

      const sleepEndTime = new Date(date);
      sleepEndTime.setHours(12, 0, 0, 0);

      const [
        steps,
        calories,
        activeCalories,
        heartRateData,
        distance,
        sleepDuration,
        floorsClimbed,
        exerciseMinutes,
      ] = await Promise.all([
        fetchStepsAggregate(startTime, endTime),
        fetchCaloriesAggregate(startTime, endTime),
        fetchActiveCaloriesAggregate(startTime, endTime),
        fetchHeartRateRecords(startTime, endTime),
        fetchDistanceAggregate(startTime, endTime),
        fetchSleepRecords(
          sleepStartTime.toISOString(),
          sleepEndTime.toISOString(),
        ),
        fetchFloorsAggregate(startTime, endTime),
        fetchExerciseRecords(startTime, endTime),
      ]);

      return {
        steps,
        calories,
        activeCalories,
        heartRate: heartRateData.current,
        heartRateMin: heartRateData.min,
        heartRateMax: heartRateData.max,
        heartRateAvg: heartRateData.avg,
        distance,
        sleepDuration,
        floorsClimbed,
        exerciseMinutes,
        date: date.toISOString(),
      };
    } catch (err) {
      console.error('Error fetching health data for date:', err);
      return null;
    }
  }, []);

  const fetchWeeklyData = useCallback(async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const stepsData = await aggregateGroupByPeriod({
        recordType: 'Steps',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      const caloriesData = await aggregateGroupByPeriod({
        recordType: 'TotalCaloriesBurned',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      const distanceData = await aggregateGroupByPeriod({
        recordType: 'Distance',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      return {
        steps: stepsData.map(item => ({
          date: item.startTime,
          value: item.result.COUNT_TOTAL || 0,
        })),
        calories: caloriesData.map(item => ({
          date: item.startTime,
          value: Math.round(item.result.inKilocalories || 0),
        })),
        distance: distanceData.map(item => ({
          date: item.startTime,
          value: Math.round((item.result.inMeters || 0) / 10) / 100,
        })),
      };
    } catch (err) {
      console.error('Error fetching weekly data:', err);
      return { steps: [], calories: [], distance: [] };
    }
  }, []);

  const fetchMonthlyData = useCallback(async (year, month) => {
    try {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

      const stepsData = await aggregateGroupByPeriod({
        recordType: 'Steps',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      const caloriesData = await aggregateGroupByPeriod({
        recordType: 'TotalCaloriesBurned',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      const activeCaloriesData = await aggregateGroupByPeriod({
        recordType: 'ActiveCaloriesBurned',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      const distanceData = await aggregateGroupByPeriod({
        recordType: 'Distance',
        timeRangeFilter: {
          operator: 'between',
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
        timeRangeSlicer: {
          period: 'DAYS',
          length: 1,
        },
      });

      const dailyData = {};

      stepsData.forEach(item => {
        const date = new Date(item.startTime).getDate();
        if (!dailyData[date]) dailyData[date] = {};
        dailyData[date].steps = item.result.COUNT_TOTAL || 0;
      });

      caloriesData.forEach(item => {
        const date = new Date(item.startTime).getDate();
        if (!dailyData[date]) dailyData[date] = {};
        dailyData[date].calories = Math.round(item.result.inKilocalories || 0);
      });

      activeCaloriesData.forEach(item => {
        const date = new Date(item.startTime).getDate();
        if (!dailyData[date]) dailyData[date] = {};
        dailyData[date].activeCalories = Math.round(
          item.result.inKilocalories || 0,
        );
      });

      distanceData.forEach(item => {
        const date = new Date(item.startTime).getDate();
        if (!dailyData[date]) dailyData[date] = {};
        dailyData[date].distance =
          Math.round((item.result.inMeters || 0) / 10) / 100;
      });

      return dailyData;
    } catch (err) {
      console.error('Error fetching monthly data:', err);
      return {};
    }
  }, []);

  const openHealthConnect = async () => {
    try {
      await openHealthConnectSettings();
    } catch (err) {
      console.error('Error opening Health Connect settings:', err);
    }
  };

  const installHealthConnect = () => {
    Linking.openURL(HEALTH_CONNECT_URL).catch(err => {
      console.error('Error opening Play Store:', err);
    });
  };

  const setup = useCallback(async () => {
    setIsLoading(true);

    const initialized = await init();
    if (!initialized) {
      setIsLoading(false);
      return;
    }

    const sdkOk = await checkSdkStatus();
    if (!sdkOk) {
      setIsLoading(false);
      return;
    }

    const hasPermissions = await requestHealthPermissions();
    if (hasPermissions) {
      await fetchAllHealthData();
    } else {
      setIsLoading(false);
    }
  }, [init, checkSdkStatus, requestHealthPermissions, fetchAllHealthData]);

  const refresh = useCallback(async () => {
    if (permissionsGranted) {
      await fetchAllHealthData();
    }
  }, [permissionsGranted, fetchAllHealthData]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setup();
    } else {
      setIsLoading(false);
      setError('Health Connect is only available on Android');
    }
  }, [setup]);

  return {
    isInitialized,
    isLoading,
    sdkAvailable,
    permissionsGranted,
    healthData,
    error,
    refresh,
    requestHealthPermissions,
    openHealthConnect,
    installHealthConnect,
    fetchHealthDataForDate,
    fetchWeeklyData,
    fetchMonthlyData,
  };
};

export default useHealthConnect;
