import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FitnessItems = createContext();

const STORAGE_KEY = 'fitness_user_data';

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [sessionCalories, setSessionCalories] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [BMI, setBMI] = useState(22.9);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [weeklyGoal, setWeeklyGoal] = useState(3);
  const [workoutsCompletedThisWeek, setWorkoutsCompletedThisWeek] = useState(0);
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastWorkoutDate, setLastWorkoutDate] = useState(null);

  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [challengeProgress, setChallengeProgress] = useState({});

  const getWeekStartDate = date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    return monday.toISOString().split('T')[0];
  };

  const calculateBMI = (weightKg, heightCm) => {
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  };

  const checkWeeklyReset = data => {
    const today = new Date();
    const thisWeekStart = getWeekStartDate(today);

    if (data.currentWeekStart !== thisWeekStart) {
      setWorkoutsCompletedThisWeek(0);
      setCurrentWeekStart(thisWeekStart);
    } else {
      setWorkoutsCompletedThisWeek(data.workoutsCompletedThisWeek || 0);
      setCurrentWeekStart(data.currentWeekStart);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedData) {
          const data = JSON.parse(storedData);

          setWeight(data.weight || 70);
          setHeight(data.height || 175);
          setBMI(data.BMI || 22.9);
          setWeeklyGoal(data.weeklyGoal || 3);
          setCurrentStreak(data.currentStreak || 0);
          setLongestStreak(data.longestStreak || 0);
          setLastWorkoutDate(data.lastWorkoutDate || null);
          setTotalWorkouts(data.totalWorkouts || 0);
          setTotalMinutes(data.totalMinutes || 0);
          setTotalCalories(data.totalCalories || 0);
          setWorkoutHistory(data.workoutHistory || []);
          setChallengeProgress(data.challengeProgress || {});

          checkWeeklyReset(data);
        }

        setIsDataLoaded(true);
      } catch (error) {
        console.log('Error loading user data:', error);
        setIsDataLoaded(true);
      }
    };

    loadUserData();
  }, []);

  const saveUserData = useCallback(async updates => {
    try {
      const currentData = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = currentData ? JSON.parse(currentData) : {};

      const updatedData = {
        ...parsed,
        ...updates,
        lastUpdated: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  }, []);

  const updateWeight = useCallback(
    async newWeight => {
      const newBMI = calculateBMI(newWeight, height);
      setWeight(newWeight);
      setBMI(newBMI);
      await saveUserData({ weight: newWeight, BMI: newBMI });
    },
    [height, saveUserData],
  );

  const updateHeight = useCallback(
    async newHeight => {
      const newBMI = calculateBMI(weight, newHeight);
      setHeight(newHeight);
      setBMI(newBMI);
      await saveUserData({ height: newHeight, BMI: newBMI });
    },
    [weight, saveUserData],
  );

  const updateWeeklyGoal = useCallback(
    async newGoal => {
      setWeeklyGoal(newGoal);
      await saveUserData({ weeklyGoal: newGoal });
    },
    [saveUserData],
  );

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    let newStreak = currentStreak;

    if (lastWorkoutDate === yesterday) {
      newStreak = currentStreak + 1;
    } else if (lastWorkoutDate !== today) {
      newStreak = 1;
    }

    const newLongestStreak = Math.max(longestStreak, newStreak);

    setCurrentStreak(newStreak);
    setLongestStreak(newLongestStreak);
    setLastWorkoutDate(today);

    return { newStreak, newLongestStreak };
  }, [currentStreak, longestStreak, lastWorkoutDate]);

  const resetSession = useCallback(() => {
    setCompleted([]);
    setSessionMinutes(0);
    setSessionCalories(0);
    setCurrentExerciseIndex(0);
  }, []);

  const completeWorkout = useCallback(
    async workoutData => {
      const today = new Date().toISOString();
      const todayDate = today.split('T')[0];

      const newWorkout = {
        id: `workout_${Date.now()}`,
        date: today,
        ...workoutData,
      };

      const updatedHistory = [newWorkout, ...workoutHistory];
      setWorkoutHistory(updatedHistory);

      const newTotalWorkouts = totalWorkouts + 1;
      const newTotalMinutes = totalMinutes + (workoutData.duration || 0);
      const newTotalCalories = totalCalories + (workoutData.calories || 0);

      setTotalWorkouts(newTotalWorkouts);
      setTotalMinutes(newTotalMinutes);
      setTotalCalories(newTotalCalories);

      const newWeeklyCount = workoutsCompletedThisWeek + 1;
      setWorkoutsCompletedThisWeek(newWeeklyCount);

      const { newStreak, newLongestStreak } = updateStreak();

      await saveUserData({
        workoutHistory: updatedHistory,
        totalWorkouts: newTotalWorkouts,
        totalMinutes: newTotalMinutes,
        totalCalories: newTotalCalories,
        workoutsCompletedThisWeek: newWeeklyCount,
        currentWeekStart: currentWeekStart || getWeekStartDate(new Date()),
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastWorkoutDate: todayDate,
      });

      resetSession();

      return newWorkout;
    },
    [
      workoutHistory,
      totalWorkouts,
      totalMinutes,
      totalCalories,
      workoutsCompletedThisWeek,
      currentWeekStart,
      updateStreak,
      saveUserData,
      resetSession,
    ],
  );

  const startChallenge = useCallback(
    async challengeId => {
      const newProgress = {
        ...challengeProgress,
        [challengeId]: {
          currentDay: 1,
          completedDays: [],
          startedAt: new Date().toISOString(),
          isCompleted: false,
        },
      };

      setChallengeProgress(newProgress);
      await saveUserData({ challengeProgress: newProgress });
    },
    [challengeProgress, saveUserData],
  );

  const completeChallengeDay = useCallback(
    async (challengeId, dayNumber, totalDays) => {
      const current = challengeProgress[challengeId];

      if (!current) {
        return false;
      }

      const updatedCompletedDays = [...current.completedDays, dayNumber];
      const isCompleted = updatedCompletedDays.length >= totalDays;
      const nextDay = isCompleted ? totalDays : dayNumber + 1;

      const newProgress = {
        ...challengeProgress,
        [challengeId]: {
          ...current,
          currentDay: nextDay,
          completedDays: updatedCompletedDays,
          isCompleted,
          completedAt: isCompleted ? new Date().toISOString() : null,
        },
      };

      setChallengeProgress(newProgress);
      await saveUserData({ challengeProgress: newProgress });

      return isCompleted;
    },
    [challengeProgress, saveUserData],
  );

  const getChallengeProgress = useCallback(
    challengeId => {
      return challengeProgress[challengeId] || null;
    },
    [challengeProgress],
  );

  const getWorkoutsInRange = useCallback(
    (startDate, endDate) => {
      return workoutHistory.filter(workout => {
        const workoutDate = new Date(workout.date);
        return (
          workoutDate >= new Date(startDate) && workoutDate <= new Date(endDate)
        );
      });
    },
    [workoutHistory],
  );

  const getTodaysWorkouts = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return workoutHistory.filter(workout => workout.date.startsWith(today));
  }, [workoutHistory]);

  const getThisWeekStats = useCallback(() => {
    const weekStart = new Date(currentWeekStart);
    const weekEnd = new Date();

    const weekWorkouts = getWorkoutsInRange(weekStart, weekEnd);

    return {
      workouts: weekWorkouts.length,
      minutes: weekWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
      calories: weekWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
    };
  }, [currentWeekStart, getWorkoutsInRange]);

  const clearAllData = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setWeight(70);
    setHeight(175);
    setBMI(22.9);
    setWeeklyGoal(3);
    setWorkoutsCompletedThisWeek(0);
    setCurrentStreak(0);
    setLongestStreak(0);
    setLastWorkoutDate(null);
    setTotalWorkouts(0);
    setTotalMinutes(0);
    setTotalCalories(0);
    setWorkoutHistory([]);
    setChallengeProgress({});
    resetSession();
  }, [resetSession]);

  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        sessionMinutes,
        setSessionMinutes,
        sessionCalories,
        setSessionCalories,
        currentExerciseIndex,
        setCurrentExerciseIndex,
        resetSession,
        weight,
        height,
        BMI,
        updateWeight,
        updateHeight,
        isDataLoaded,
        weeklyGoal,
        updateWeeklyGoal,
        workoutsCompletedThisWeek,
        currentStreak,
        longestStreak,
        lastWorkoutDate,
        totalWorkouts,
        totalMinutes,
        totalCalories,
        workoutHistory,
        completeWorkout,
        getWorkoutsInRange,
        getTodaysWorkouts,
        getThisWeekStats,
        challengeProgress,
        startChallenge,
        completeChallengeDay,
        getChallengeProgress,
        clearAllData,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
