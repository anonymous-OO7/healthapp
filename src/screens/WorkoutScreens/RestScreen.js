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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { exercises, nextIndex } = route.params;

  const nextExercise = exercises[nextIndex];
  const [timeLeft, setTimeLeft] = useState(20);

  const safeVibrate = duration => {
    try {
      Vibration.vibrate(duration);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          safeVibrate(300);
          handleSkip();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    navigation.replace('Fit', {
      ...route.params,
      currentIndex: nextIndex,
    });
  };

  const handleAddTime = () => {
    setTimeLeft(prev => prev + 20);
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

      <View style={styles.topHalf}>
        <View style={styles.headerIcons}>
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
            source={{ uri: nextExercise.image }}
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
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.nextInfoContainer}>
          <View style={styles.nextHeaderRow}>
            <Text style={styles.nextStepText}>
              NEXT {nextIndex + 1}/{exercises.length}
            </Text>
            <Text style={styles.nextTimeText}>
              {nextExercise.type === 'time'
                ? `00:${nextExercise.value.toString().padStart(2, '0')}`
                : `x ${nextExercise.value}`}
            </Text>
          </View>
          <View style={styles.nextTitleRow}>
            <Text style={styles.nextTitleText}>
              {nextExercise.name.toUpperCase()}
            </Text>
            <Feather
              name="help-circle"
              size={16}
              color="#FFFFFF"
              style={styles.helpIcon}
            />
          </View>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.restText}>REST</Text>
          <Text style={styles.largeTimerText}>{formatTime(timeLeft)}</Text>
          <Pressable style={styles.editRestButton}>
            <Text style={styles.editRestText}>Edit Rest Time</Text>
          </Pressable>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.addTimeButton} onPress={handleAddTime}>
            <Text style={styles.addTimeText}>+20s</Text>
          </Pressable>
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topHalf: {
    flex: 1.1,
    backgroundColor: '#FAFAFA',
    position: 'relative',
    justifyContent: 'center',
  },
  headerIcons: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    marginTop: 20,
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
  bottomHalf: {
    flex: 1,
    backgroundColor: '#0066FF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    justifyContent: 'space-between',
  },
  nextInfoContainer: {
    marginBottom: 20,
  },
  nextHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextStepText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  nextTimeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  nextTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextTitleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  helpIcon: {
    marginLeft: 8,
    opacity: 0.8,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  restText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  largeTimerText: {
    color: '#FFFFFF',
    fontSize: 72,
    fontWeight: '800',
    marginBottom: 20,
  },
  editRestButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editRestText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  addTimeButton: {
    flex: 0.47,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTimeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  skipButton: {
    flex: 0.47,
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    color: '#0066FF',
    fontSize: 18,
    fontWeight: '700',
  },
});
