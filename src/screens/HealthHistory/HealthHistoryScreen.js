import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useHealthConnect from '../../hooks/useHealthConnect';
import styles from './HealthHistoryScreen.styles';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatNumber = num => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

const formatSleepDuration = minutes => {
  if (minutes === 0) return '0';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const StatItem = ({ icon, iconBg, value, unit, label }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <Text style={styles.statValue}>
      {value}
      {unit && <Text style={styles.statUnit}> {unit}</Text>}
    </Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const WideStatItem = ({ icon, iconBg, value, unit, label }) => (
  <View style={[styles.statCard, styles.statCardWide]}>
    <View style={[styles.statIconContainer, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <Text style={styles.statValue}>
      {value}
      {unit && <Text style={styles.statUnit}> {unit}</Text>}
    </Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HealthHistoryScreen = () => {
  const navigation = useNavigation();
  const {
    isLoading: hookLoading,
    sdkAvailable,
    permissionsGranted,
    fetchHealthDataForDate,
    fetchWeeklyData,
    fetchMonthlyData,
    requestHealthPermissions,
    installHealthConnect,
  } = useHealthConnect();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [monthlyData, setMonthlyData] = useState({});
  const [weeklyData, setWeeklyData] = useState({
    steps: [],
    calories: [],
    distance: [],
  });
  const [isLoadingDate, setIsLoadingDate] = useState(false);
  const [isLoadingMonth, setIsLoadingMonth] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState('steps');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isFuture = date > today;
      const hasData =
        monthlyData[i] &&
        (monthlyData[i].steps > 0 || monthlyData[i].calories > 0);

      days.push({
        day: i,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isFuture,
        hasData,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 0; i < remainingDays; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    return days;
  }, [currentMonth, selectedDate, monthlyData, today]);

  const loadMonthlyData = useCallback(async () => {
    setIsLoadingMonth(true);
    try {
      const data = await fetchMonthlyData(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
      );
      setMonthlyData(data);
    } catch (err) {
      console.error('Error loading monthly data:', err);
    } finally {
      setIsLoadingMonth(false);
    }
  }, [currentMonth, fetchMonthlyData]);

  const loadSelectedDateData = useCallback(async () => {
    setIsLoadingDate(true);
    try {
      const data = await fetchHealthDataForDate(selectedDate);
      setSelectedDateData(data);
    } catch (err) {
      console.error('Error loading date data:', err);
      setSelectedDateData(null);
    } finally {
      setIsLoadingDate(false);
    }
  }, [selectedDate, fetchHealthDataForDate]);

  const loadWeeklyData = useCallback(async () => {
    try {
      const data = await fetchWeeklyData();
      setWeeklyData(data);
    } catch (err) {
      console.error('Error loading weekly data:', err);
    }
  }, [fetchWeeklyData]);

  useEffect(() => {
    if (permissionsGranted) {
      loadMonthlyData();
      loadWeeklyData();
    }
  }, [permissionsGranted, loadMonthlyData, loadWeeklyData]);

  useEffect(() => {
    if (permissionsGranted) {
      loadSelectedDateData();
    }
  }, [permissionsGranted, selectedDate, loadSelectedDateData]);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1,
    );
    if (nextMonth <= today) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleDayPress = day => {
    if (day.day && day.isCurrentMonth && !day.isFuture) {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day.day,
      );
      setSelectedDate(newDate);
    }
  };

  const formatSelectedDate = () => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return selectedDate.toLocaleDateString('en-US', options);
  };

  const isSelectedToday = () => {
    return selectedDate.toDateString() === today.toDateString();
  };

  const getChartData = () => {
    const data = weeklyData[activeChartTab] || [];
    if (data.length === 0) return [];

    const maxValue = Math.max(...data.map(d => d.value), 1);

    return data.map(item => {
      const date = new Date(item.date);
      return {
        label: WEEK_DAYS[date.getDay()].substring(0, 1),
        value: item.value,
        height: (item.value / maxValue) * 100,
      };
    });
  };

  const getBarColor = () => {
    switch (activeChartTab) {
      case 'steps':
        return '#0066FF';
      case 'calories':
        return '#FF5722';
      case 'distance':
        return '#9C27B0';
      default:
        return '#0066FF';
    }
  };

  const getWeeklySummary = () => {
    const data = weeklyData[activeChartTab] || [];
    if (data.length === 0) return { total: 0, average: 0, best: 0 };

    const values = data.map(d => d.value);
    const total = values.reduce((a, b) => a + b, 0);
    const average = Math.round(total / values.length);
    const best = Math.max(...values);

    return { total, average, best };
  };

  if (Platform.OS !== 'android') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={20} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Health History</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIconContainer}>
            <Feather name="smartphone" size={36} color="#FF9800" />
          </View>
          <Text style={styles.permissionTitle}>Not Available</Text>
          <Text style={styles.permissionDescription}>
            Health Connect is only available on Android devices
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!sdkAvailable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={20} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Health History</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIconContainer}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={36}
              color="#FF9800"
            />
          </View>
          <Text style={styles.permissionTitle}>Health Connect Required</Text>
          <Text style={styles.permissionDescription}>
            Please install Health Connect from the Play Store to view your
            health history
          </Text>
          <Pressable
            style={styles.permissionButton}
            onPress={installHealthConnect}
          >
            <Text style={styles.permissionButtonText}>
              Install Health Connect
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!permissionsGranted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={20} color="#1A1A1A" />
          </Pressable>
          <Text style={styles.headerTitle}>Health History</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.permissionContainer}>
          <View
            style={[
              styles.permissionIconContainer,
              { backgroundColor: '#E3F2FD' },
            ]}
          >
            <MaterialCommunityIcons
              name="shield-check"
              size={36}
              color="#0066FF"
            />
          </View>
          <Text style={styles.permissionTitle}>Permission Required</Text>
          <Text style={styles.permissionDescription}>
            Allow access to your health data to view your activity history
          </Text>
          <Pressable
            style={styles.permissionButton}
            onPress={requestHealthPermissions}
          >
            <Text style={styles.permissionButtonText}>Grant Permissions</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const chartData = getChartData();
  const weeklySummary = getWeeklySummary();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={20} color="#1A1A1A" />
        </Pressable>
        <Text style={styles.headerTitle}>Health History</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Pressable
              style={styles.calendarNavButton}
              onPress={goToPreviousMonth}
            >
              <Feather name="chevron-left" size={20} color="#1A1A1A" />
            </Pressable>
            <Text style={styles.calendarTitle}>
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <Pressable
              style={[
                styles.calendarNavButton,
                currentMonth.getMonth() === today.getMonth() &&
                  currentMonth.getFullYear() === today.getFullYear() && {
                    opacity: 0.5,
                  },
              ]}
              onPress={goToNextMonth}
              disabled={
                currentMonth.getMonth() === today.getMonth() &&
                currentMonth.getFullYear() === today.getFullYear()
              }
            >
              <Feather name="chevron-right" size={20} color="#1A1A1A" />
            </Pressable>
          </View>

          <View style={styles.weekDaysRow}>
            {WEEK_DAYS.map(day => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          {isLoadingMonth && (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#0066FF" />
            </View>
          )}

          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <Pressable
                key={index}
                style={styles.calendarDay}
                onPress={() => handleDayPress(day)}
                disabled={!day.day || !day.isCurrentMonth || day.isFuture}
              >
                <View
                  style={[
                    styles.calendarDayInner,
                    day.isSelected && styles.calendarDaySelected,
                    day.isToday && !day.isSelected && styles.calendarDayToday,
                    day.hasData &&
                      !day.isSelected &&
                      !day.isToday &&
                      styles.calendarDayHasData,
                  ]}
                >
                  {day.day && (
                    <>
                      <Text
                        style={[
                          styles.calendarDayText,
                          day.isSelected && styles.calendarDayTextSelected,
                          day.isFuture && styles.calendarDayTextDisabled,
                          !day.isCurrentMonth && styles.calendarDayTextDisabled,
                        ]}
                      >
                        {day.day}
                      </Text>
                      {day.hasData && !day.isSelected && !day.isToday && (
                        <View style={styles.dataIndicator} />
                      )}
                    </>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.selectedDateContainer}>
          <View style={styles.selectedDateHeader}>
            <View style={styles.selectedDateIconContainer}>
              <Feather name="calendar" size={20} color="#0066FF" />
            </View>
            <View>
              <Text style={styles.selectedDateText}>
                {isSelectedToday() ? 'Today' : formatSelectedDate()}
              </Text>
              <Text style={styles.selectedDateSubtext}>
                Daily Activity Summary
              </Text>
            </View>
          </View>

          {isLoadingDate ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0066FF" />
              <Text style={styles.loadingText}>Loading health data...</Text>
            </View>
          ) : selectedDateData ? (
            <>
              <View style={styles.statsGrid}>
                <StatItem
                  icon={
                    <MaterialCommunityIcons
                      name="walk"
                      size={20}
                      color="#0066FF"
                    />
                  }
                  iconBg="#E3F2FD"
                  value={formatNumber(selectedDateData.steps)}
                  label="Steps"
                />
                <StatItem
                  icon={
                    <MaterialCommunityIcons
                      name="fire"
                      size={20}
                      color="#FF5722"
                    />
                  }
                  iconBg="#FBE9E7"
                  value={selectedDateData.calories}
                  unit="kcal"
                  label="Calories"
                />
                <StatItem
                  icon={
                    <MaterialCommunityIcons
                      name="lightning-bolt"
                      size={20}
                      color="#FF9800"
                    />
                  }
                  iconBg="#FFF3E0"
                  value={selectedDateData.activeCalories}
                  unit="kcal"
                  label="Active"
                />
                <StatItem
                  icon={
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={20}
                      color="#9C27B0"
                    />
                  }
                  iconBg="#F3E5F5"
                  value={selectedDateData.distance}
                  unit="km"
                  label="Distance"
                />
                <StatItem
                  icon={
                    <MaterialCommunityIcons
                      name="bed"
                      size={20}
                      color="#3F51B5"
                    />
                  }
                  iconBg="#E8EAF6"
                  value={formatSleepDuration(selectedDateData.sleepDuration)}
                  label="Sleep"
                />
                <StatItem
                  icon={
                    <MaterialCommunityIcons
                      name="timer"
                      size={20}
                      color="#4CAF50"
                    />
                  }
                  iconBg="#E8F5E9"
                  value={selectedDateData.exerciseMinutes}
                  unit="min"
                  label="Exercise"
                />
              </View>

              <View style={[styles.statsGrid, { marginTop: 6 }]}>
                <WideStatItem
                  icon={
                    <MaterialCommunityIcons
                      name="stairs-up"
                      size={20}
                      color="#00BCD4"
                    />
                  }
                  iconBg="#E0F7FA"
                  value={selectedDateData.floorsClimbed}
                  label="Floors Climbed"
                />
                <WideStatItem
                  icon={
                    <MaterialCommunityIcons
                      name="heart"
                      size={20}
                      color="#E91E63"
                    />
                  }
                  iconBg="#FCE4EC"
                  value={selectedDateData.heartRateAvg || '--'}
                  unit={selectedDateData.heartRateAvg ? 'bpm' : ''}
                  label="Avg Heart Rate"
                />
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <View style={styles.noDataIconContainer}>
                <MaterialCommunityIcons
                  name="chart-line-variant"
                  size={32}
                  color="#BDBDBD"
                />
              </View>
              <Text style={styles.noDataText}>No Data Available</Text>
              <Text style={styles.noDataSubtext}>
                No health data was recorded for this date
              </Text>
            </View>
          )}
        </View>

        {selectedDateData && selectedDateData.heartRateAvg && (
          <View style={styles.heartRateContainer}>
            <View style={styles.heartRateHeader}>
              <View style={styles.heartRateIcon}>
                <MaterialCommunityIcons
                  name="heart-pulse"
                  size={22}
                  color="#E91E63"
                />
              </View>
              <Text style={styles.heartRateTitle}>Heart Rate Details</Text>
            </View>

            <View style={styles.heartRateStats}>
              <View style={styles.heartRateStat}>
                <Text style={styles.heartRateStatLabel}>Min</Text>
                <Text style={[styles.heartRateStatValue, { color: '#4CAF50' }]}>
                  {selectedDateData.heartRateMin || '--'}
                </Text>
                <Text style={styles.heartRateStatUnit}>bpm</Text>
              </View>
              <View style={styles.heartRateStat}>
                <Text style={styles.heartRateStatLabel}>Avg</Text>
                <Text style={[styles.heartRateStatValue, { color: '#0066FF' }]}>
                  {selectedDateData.heartRateAvg || '--'}
                </Text>
                <Text style={styles.heartRateStatUnit}>bpm</Text>
              </View>
              <View style={styles.heartRateStat}>
                <Text style={styles.heartRateStatLabel}>Max</Text>
                <Text style={[styles.heartRateStatValue, { color: '#FF5722' }]}>
                  {selectedDateData.heartRateMax || '--'}
                </Text>
                <Text style={styles.heartRateStatUnit}>bpm</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.weeklyChartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Overview</Text>
            <View style={styles.chartTabs}>
              <Pressable
                style={[
                  styles.chartTab,
                  activeChartTab === 'steps' && styles.chartTabActive,
                ]}
                onPress={() => setActiveChartTab('steps')}
              >
                <Text
                  style={[
                    styles.chartTabText,
                    activeChartTab === 'steps' && styles.chartTabTextActive,
                  ]}
                >
                  Steps
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.chartTab,
                  activeChartTab === 'calories' && styles.chartTabActive,
                ]}
                onPress={() => setActiveChartTab('calories')}
              >
                <Text
                  style={[
                    styles.chartTabText,
                    activeChartTab === 'calories' && styles.chartTabTextActive,
                  ]}
                >
                  Cal
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.chartTab,
                  activeChartTab === 'distance' && styles.chartTabActive,
                ]}
                onPress={() => setActiveChartTab('distance')}
              >
                <Text
                  style={[
                    styles.chartTabText,
                    activeChartTab === 'distance' && styles.chartTabTextActive,
                  ]}
                >
                  Dist
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.chartContent}>
            {chartData.length > 0 ? (
              <View style={styles.barChartContainer}>
                {chartData.map((item, index) => (
                  <View key={index} style={styles.barItem}>
                    <View style={styles.barWrapper}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height: `${Math.max(item.height, 5)}%`,
                            backgroundColor: getBarColor(),
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.barLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataSubtext}>
                  No weekly data available
                </Text>
              </View>
            )}
          </View>

          {chartData.length > 0 && (
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: getBarColor() }]}
                />
                <Text style={styles.legendText}>
                  {activeChartTab === 'steps'
                    ? 'Steps'
                    : activeChartTab === 'calories'
                    ? 'Calories'
                    : 'Distance'}
                </Text>
              </View>
            </View>
          )}
        </View>

        {chartData.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Weekly Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>
                {activeChartTab === 'steps'
                  ? formatNumber(weeklySummary.total)
                  : activeChartTab === 'calories'
                  ? `${weeklySummary.total} kcal`
                  : `${weeklySummary.total.toFixed(2)} km`}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Daily Average</Text>
              <Text style={styles.summaryValue}>
                {activeChartTab === 'steps'
                  ? formatNumber(weeklySummary.average)
                  : activeChartTab === 'calories'
                  ? `${weeklySummary.average} kcal`
                  : `${weeklySummary.average.toFixed(2)} km`}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Text style={styles.summaryLabel}>Best Day</Text>
              <Text style={styles.summaryValue}>
                {activeChartTab === 'steps'
                  ? formatNumber(weeklySummary.best)
                  : activeChartTab === 'calories'
                  ? `${weeklySummary.best} kcal`
                  : `${weeklySummary.best.toFixed(2)} km`}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthHistoryScreen;
