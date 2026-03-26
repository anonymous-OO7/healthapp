// src/screens/Training/FitScreen.js

import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Platform,
  StatusBar,
  Vibration,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

import { FitnessItems } from '../../context/Context';
import { formatExerciseValue } from '../../utils/exerciseHelper';

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    exercises,
    workoutId,
    workoutName,
    isChallenge,
    durationDays,
    currentDay,
  } = route.params;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const current = exercises[index];

  const {
    completed,
    setCompleted,
    sessionMinutes,
    setSessionMinutes,
    sessionCalories,
    setSessionCalories,
    completeWorkout,
    completeChallengeDay,
  } = useContext(FitnessItems);

  // Timer for time-based exercises
  useEffect(() => {
    if (current.type === 'time' && timeRemaining === null) {
      setTimeRemaining(current.value);
    }
  }, [current, timeRemaining]);

  useEffect(() => {
    let interval;
    if (current.type === 'time' && timeRemaining > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Auto complete when timer reaches 0
      Vibration.vibrate(500);
      handleDone();
    }

    return () => clearInterval(interval);
  }, [timeRemaining, isPaused, current.type, handleDone]);

  const handleDone = useCallback(async () => {
    // Add to completed
    setCompleted([...completed, current.name]);

    // Update session stats
    const exerciseTime = current.type === 'time' ? current.value / 60 : 0.5;
    setSessionMinutes(sessionMinutes + exerciseTime);
    setSessionCalories(sessionCalories + (current.calories || 6));

    // Check if workout is complete
    if (index + 1 >= exercises.length) {
      // Workout complete
      const workoutData = {
        name: workoutName,
        bodyType: workoutId,
        duration: Math.ceil(sessionMinutes + exerciseTime),
        calories: Math.ceil(sessionCalories + (current.calories || 6)),
        exerciseCount: exercises.length,
        exercises: [...completed, current.name],
      };

      await completeWorkout(workoutData);

      // Complete challenge day if applicable
      if (isChallenge) {
        await completeChallengeDay(workoutId, currentDay, durationDays);
      }

      navigation.navigate('WorkoutHome');
    } else {
      // Reset timer for next exercise
      setTimeRemaining(null);
      // Go to rest screen
      navigation.navigate('Rest', {
        nextExercise: exercises[index + 1],
        onContinue: () => setIndex(index + 1),
      });
    }
  }, [
    completed,
    current,
    index,
    exercises,
    sessionMinutes,
    sessionCalories,
    workoutName,
    workoutId,
    isChallenge,
    currentDay,
    durationDays,
    navigation,
    setCompleted,
    setSessionMinutes,
    setSessionCalories,
    completeWorkout,
    completeChallengeDay,
  ]);

  const goToPrevious = () => {
    if (index > 0) {
      setTimeRemaining(null);
      navigation.navigate('Rest', {
        nextExercise: exercises[index - 1],
        onContinue: () => setIndex(index - 1),
      });
    }
  };

  const goToNext = () => {
    if (index + 1 >= exercises.length) {
      navigation.navigate('WorkoutHome');
    } else {
      setTimeRemaining(null);
      navigation.navigate('Rest', {
        nextExercise: exercises[index + 1],
        onContinue: () => setIndex(index + 1),
      });
    }
  };

  const displayValue = () => {
    if (current.type === 'time' && timeRemaining !== null) {
      const mins = Math.floor(timeRemaining / 60)
        .toString()
        .padStart(2, '0');
      const secs = (timeRemaining % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
    return formatExerciseValue(current.type, current.value);
  };

  const progress = ((index + 1) / exercises.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="#1A1A1A" />
        </Pressable>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {index + 1} / {exercises.length}
          </Text>
        </View>

        <Pressable
          style={styles.pauseButton}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Feather
            name={isPaused ? 'play' : 'pause'}
            size={20}
            color="#1A1A1A"
          />
        </Pressable>
      </View>

      {/* Exercise Image */}
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.exerciseImage}
          source={{ uri: current.image, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.contain}
        />

        {isPaused && (
          <View style={styles.pausedOverlay}>
            <Text style={styles.pausedText}>PAUSED</Text>
          </View>
        )}
      </View>

      {/* Exercise Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.exerciseName}>{current.name}</Text>

        <View style={styles.valueContainer}>
          <View
            style={[
              styles.valueIcon,
              {
                backgroundColor:
                  current.type === 'time' ? '#E3F2FD' : '#E8F5E9',
              },
            ]}
          >
            <Feather
              name={current.type === 'time' ? 'clock' : 'repeat'}
              size={24}
              color={current.type === 'time' ? '#0066FF' : '#4CAF50'}
            />
          </View>
          <Text style={styles.exerciseValue}>{displayValue()}</Text>
        </View>

        {current.description && (
          <Text style={styles.exerciseDescription}>{current.description}</Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Feather name="check" size={24} color="#FFFFFF" />
          <Text style={styles.doneButtonText}>DONE</Text>
        </Pressable>

        <View style={styles.navContainer}>
          <Pressable
            disabled={index === 0}
            onPress={goToPrevious}
            style={[styles.navButton, index === 0 && styles.navButtonDisabled]}
          >
            <Feather name="chevron-left" size={20} color="#1A1A1A" />
            <Text style={styles.navButtonText}>PREV</Text>
          </Pressable>

          <Pressable onPress={goToNext} style={styles.navButton}>
            <Text style={styles.navButtonText}>SKIP</Text>
            <Feather name="chevron-right" size={20} color="#1A1A1A" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066FF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    width: 45,
  },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  exerciseImage: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  pausedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  pausedText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 15,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
  },
  valueIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 20,
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 25,
  },
  doneButton: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 0.48,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginHorizontal: 5,
  },
});
