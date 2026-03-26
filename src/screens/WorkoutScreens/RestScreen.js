// src/screens/Training/RestScreen.js

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  Vibration,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

const REST_DURATION = 15; // 15 seconds rest

const RestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nextExercise, onContinue } = route.params || {};

  const [timeLeft, setTimeLeft] = useState(REST_DURATION);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isSkipped) {
            Vibration.vibrate(300);
            handleContinue();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleContinue, isSkipped]);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    navigation.goBack();
  };

  const handleSkip = () => {
    setIsSkipped(true);
    handleContinue();
  };

  const handleAddTime = () => {
    setTimeLeft(prev => prev + 10);
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const progress = ((REST_DURATION - timeLeft) / REST_DURATION) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rest Time</Text>
      </View>

      {/* Timer Section */}
      <View style={styles.timerSection}>
        <View style={styles.timerCircle}>
          <View style={styles.timerInner}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerLabel}>Remaining</Text>
          </View>
          {/* Progress Ring - simplified as background fill */}
          <View
            style={[
              styles.progressRing,
              {
                transform: [{ rotate: `${(progress / 100) * 360}deg` }],
              },
            ]}
          />
        </View>

        {/* Time Controls */}
        <View style={styles.timeControls}>
          <Pressable style={styles.timeButton} onPress={handleAddTime}>
            <Feather name="plus" size={20} color="#0066FF" />
            <Text style={styles.timeButtonText}>+10s</Text>
          </Pressable>
        </View>
      </View>

      {/* Next Exercise Preview */}
      {nextExercise && (
        <View style={styles.nextExerciseSection}>
          <Text style={styles.nextLabel}>NEXT EXERCISE</Text>
          <View style={styles.nextExerciseCard}>
            <FastImage
              source={{ uri: nextExercise.image }}
              style={styles.nextExerciseImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.nextExerciseInfo}>
              <Text style={styles.nextExerciseName}>{nextExercise.name}</Text>
              <View style={styles.nextExerciseMeta}>
                <Feather
                  name={nextExercise.type === 'time' ? 'clock' : 'repeat'}
                  size={14}
                  color="#8E8E93"
                />
                <Text style={styles.nextExerciseValue}>
                  {nextExercise.type === 'time'
                    ? `${nextExercise.value}s`
                    : `×${nextExercise.value}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <Feather name="skip-forward" size={20} color="#FFFFFF" />
          <Text style={styles.skipButtonText}>SKIP REST</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
  },
  timerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  timerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerInner: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 52,
    fontWeight: '700',
    color: '#0066FF',
  },
  timerLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 5,
  },
  progressRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 110,
    borderWidth: 6,
    borderColor: '#0066FF',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  timeControls: {
    flexDirection: 'row',
    marginTop: 30,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
    marginLeft: 8,
  },
  nextExerciseSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    letterSpacing: 1,
    marginBottom: 12,
  },
  nextExerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 12,
  },
  nextExerciseImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#EEEEEE',
  },
  nextExerciseInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nextExerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  nextExerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextExerciseValue: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 5,
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 25,
  },
  skipButton: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
