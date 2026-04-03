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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { FitnessItems } from '../../context/Context';

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
    currentIndex,
  } = route.params;

  const current = exercises[currentIndex];

  const {
    completed,
    setCompleted,
    sessionMinutes,
    setSessionMinutes,
    sessionCalories,
    setSessionCalories,
  } = useContext(FitnessItems);

  const [isReady, setIsReady] = useState(currentIndex === 0);
  const [readyTime, setReadyTime] = useState(15);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    current.type === 'time' ? current.value : 0,
  );

  const safeVibrate = duration => {
    try {
      Vibration.vibrate(duration);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let readyInterval;
    if (isReady && readyTime > 0) {
      readyInterval = setInterval(() => {
        setReadyTime(prev => prev - 1);
      }, 1000);
    } else if (isReady && readyTime === 0) {
      setIsReady(false);
      safeVibrate(400);
    }
    return () => clearInterval(readyInterval);
  }, [isReady, readyTime]);

  useEffect(() => {
    let interval;
    if (!isReady && current.type === 'time' && timeRemaining > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (!isReady && current.type === 'time' && timeRemaining === 0) {
      safeVibrate(500);
      handleDone();
    }
    return () => clearInterval(interval);
  }, [isReady, timeRemaining, isPaused, current.type]);

  const handleDone = useCallback(async () => {
    if (!completed.includes(current.name)) {
      setCompleted([...completed, current.name]);
    }

    const exerciseTime = current.type === 'time' ? current.value / 60 : 0.5;
    setSessionMinutes(sessionMinutes + exerciseTime);
    setSessionCalories(sessionCalories + (current.calories || 6));

    if (currentIndex + 1 >= exercises.length) {
      navigation.replace('WorkoutComplete', {
        workoutId,
        workoutName,
        isChallenge,
        durationDays,
        currentDay,
      });
    } else {
      navigation.replace('Rest', {
        ...route.params,
        nextIndex: currentIndex + 1,
      });
    }
  }, [
    completed,
    current,
    currentIndex,
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
    route.params,
  ]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      navigation.replace('Fit', {
        ...route.params,
        currentIndex: currentIndex - 1,
      });
    }
  };

  const goToNext = () => {
    handleDone();
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View style={styles.topSection}>
        <View style={styles.headerIcons}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={28} color="#C4C4C4" />
          </Pressable>
          <View style={styles.headerRightIcons}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="videocam" size={24} color="#C4C4C4" />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Ionicons name="volume-high" size={24} color="#C4C4C4" />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <MaterialIcons name="library-music" size={24} color="#C4C4C4" />
            </Pressable>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          <FastImage
            style={styles.exerciseImage}
            source={{ uri: current.image, priority: FastImage.priority.high }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={styles.feedbackIcons}>
          <Pressable style={styles.feedbackButton}>
            <MaterialIcons name="thumb-down" size={24} color="#E0E0E0" />
          </Pressable>
          <Pressable style={styles.feedbackButton}>
            <MaterialIcons name="thumb-up" size={24} color="#E0E0E0" />
          </Pressable>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${(currentIndex / exercises.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        {isReady ? (
          <View style={styles.readyContainer}>
            <Text style={styles.readyTitle}>READY TO GO!</Text>
            <View style={styles.exerciseTitleRow}>
              <Text style={styles.exerciseNameText}>
                {current.name.toUpperCase()}
              </Text>
              <Feather name="help-circle" size={18} color="#8E8E93" />
            </View>

            <View style={styles.readyTimerContainer}>
              <View style={styles.readyCircle}>
                <Text style={styles.readyTimerText}>{readyTime}</Text>
              </View>
              <Pressable
                style={styles.skipReadyButton}
                onPress={() => setIsReady(false)}
              >
                <Feather name="chevron-right" size={28} color="#1A1A1A" />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.activeContainer}>
            <View style={styles.activeTitleContainer}>
              <Text style={styles.activeExerciseName}>
                {current.name.toUpperCase()}
              </Text>
              <Feather
                name="help-circle"
                size={18}
                color="#8E8E93"
                style={styles.helpIcon}
              />
            </View>

            <Text style={styles.mainTimerText}>
              {current.type === 'time'
                ? formatTime(timeRemaining)
                : `x ${current.value}`}
            </Text>

            <View style={styles.controlsRow}>
              <Pressable
                onPress={goToPrevious}
                style={styles.navButton}
                disabled={currentIndex === 0}
              >
                <Ionicons
                  name="play-skip-back"
                  size={24}
                  color={currentIndex === 0 ? '#E0E0E0' : '#8E8E93'}
                />
              </Pressable>

              {current.type === 'time' ? (
                <Pressable
                  style={styles.playPausePill}
                  onPress={() => setIsPaused(!isPaused)}
                >
                  <Ionicons
                    name={isPaused ? 'play' : 'pause'}
                    size={32}
                    color="#FFFFFF"
                  />
                </Pressable>
              ) : (
                <Pressable style={styles.donePill} onPress={handleDone}>
                  <Text style={styles.donePillText}>DONE</Text>
                </Pressable>
              )}

              <Pressable onPress={goToNext} style={styles.navButton}>
                <Ionicons name="play-skip-forward" size={24} color="#1A1A1A" />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topSection: {
    flex: 1.2,
    backgroundColor: '#FAFAFA',
    position: 'relative',
    justifyContent: 'center',
  },
  headerIcons: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  exerciseImage: {
    width: '90%',
    height: '80%',
  },
  feedbackIcons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  feedbackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#E0E0E0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0066FF',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  readyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  readyTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0066FF',
    marginBottom: 15,
  },
  exerciseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  exerciseNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginRight: 8,
  },
  readyTimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#F0F0F0',
    borderLeftColor: '#0066FF',
    borderTopColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readyTimerText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  skipReadyButton: {
    position: 'absolute',
    right: -60,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  activeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  activeExerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  helpIcon: {
    marginLeft: 8,
  },
  mainTimerText: {
    fontSize: 72,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 40,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  navButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPausePill: {
    width: 120,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  donePill: {
    width: 120,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  donePillText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
});
