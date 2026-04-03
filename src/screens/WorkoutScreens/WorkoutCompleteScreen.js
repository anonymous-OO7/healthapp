import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { FitnessItems } from '../../context/Context';

const ConfettiPiece = ({ color, left, top, rotate }) => (
  <View
    style={[
      styles.confetti,
      { backgroundColor: color, left, top, transform: [{ rotate }] },
    ]}
  />
);

const WorkoutCompleteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { workoutId, workoutName, isChallenge, durationDays, currentDay } =
    route.params;

  const {
    sessionMinutes,
    sessionCalories,
    completed,
    completeWorkout,
    completeChallengeDay,
  } = useContext(FitnessItems);

  const [feeling, setFeeling] = useState('just_right');
  const [weight, setWeight] = useState('78.9');
  const [unit, setUnit] = useState('KG');

  const handleNext = async () => {
    const workoutData = {
      name: workoutName,
      bodyType: workoutId,
      duration: Math.ceil(sessionMinutes),
      calories: Math.ceil(sessionCalories),
      exerciseCount: completed.length,
      exercises: completed,
    };

    await completeWorkout(workoutData);

    if (isChallenge) {
      await completeChallengeDay(workoutId, currentDay, durationDays);
    }

    navigation.navigate('DashBoard');
  };

  const formatTime = mins => {
    const totalSeconds = Math.round(mins * 60);
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const colors = [
    '#FF4081',
    '#FFEB3B',
    '#FF9800',
    '#4CAF50',
    '#00BCD4',
    '#9C27B0',
  ];
  const confetti = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 40}%`,
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
        }}
        style={styles.headerBackground}
        imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.headerOverlay} />

        {confetti.map(c => (
          <ConfettiPiece key={c.id} {...c} />
        ))}

        <View style={styles.topBar}>
          <Pressable onPress={() => navigation.navigate('DashBoard')}>
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </Pressable>
          <View style={styles.topBarRight}>
            <Text style={styles.reminderText}>Reminder</Text>
            <Feather name="share-2" size={24} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Nice, you've completed exercise!</Text>
          <Text style={styles.subTitle}>{workoutName}</Text>
        </View>
      </ImageBackground>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Exercises</Text>
          <Text style={styles.statValue}>{completed.length}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Calorie</Text>
          <Text style={styles.statValue}>{sessionCalories.toFixed(1)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>{formatTime(sessionMinutes)}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>How do you feel</Text>
        <Text style={styles.sectionSubtitle}>
          Your feedback will help us provide more suitable workouts for you
        </Text>

        <View style={styles.feelingContainer}>
          <Pressable
            style={styles.feelingItem}
            onPress={() => setFeeling('too_hard')}
          >
            <View
              style={[
                styles.feelingEmojiBg,
                feeling === 'too_hard'
                  ? styles.selectedBg
                  : styles.unselectedBg,
              ]}
            >
              <Text style={styles.feelingEmoji}>😫</Text>
            </View>
            <Text
              style={[
                styles.feelingText,
                feeling === 'too_hard' && styles.selectedText,
              ]}
            >
              Too hard
            </Text>
          </Pressable>

          <Pressable
            style={styles.feelingItem}
            onPress={() => setFeeling('just_right')}
          >
            <View
              style={[
                styles.feelingEmojiBg,
                feeling === 'just_right'
                  ? styles.selectedBg
                  : styles.unselectedBg,
              ]}
            >
              <Text style={styles.feelingEmoji}>😀</Text>
            </View>
            <Text
              style={[
                styles.feelingText,
                feeling === 'just_right' && styles.selectedText,
              ]}
            >
              Just right
            </Text>
          </Pressable>

          <Pressable
            style={styles.feelingItem}
            onPress={() => setFeeling('too_easy')}
          >
            <View
              style={[
                styles.feelingEmojiBg,
                feeling === 'too_easy'
                  ? styles.selectedBg
                  : styles.unselectedBg,
              ]}
            >
              <Text style={styles.feelingEmoji}>😌</Text>
            </View>
            <Text
              style={[
                styles.feelingText,
                feeling === 'too_easy' && styles.selectedText,
              ]}
            >
              Too easy
            </Text>
          </Pressable>
        </View>

        <View style={styles.weightCard}>
          <Text style={styles.weightLabel}>Weight</Text>
          <View style={styles.weightRow}>
            <TextInput
              style={styles.weightInput}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <Text style={styles.weightUnitText}>{unit.toLowerCase()}</Text>
            <View style={styles.unitToggle}>
              <Pressable
                style={[styles.unitBtn, unit === 'KG' && styles.unitBtnActive]}
                onPress={() => setUnit('KG')}
              >
                <Text
                  style={[
                    styles.unitBtnText,
                    unit === 'KG' && styles.unitBtnTextActive,
                  ]}
                >
                  KG
                </Text>
              </Pressable>
              <Pressable
                style={[styles.unitBtn, unit === 'LB' && styles.unitBtnActive]}
                onPress={() => setUnit('LB')}
              >
                <Text
                  style={[
                    styles.unitBtnText,
                    unit === 'LB' && styles.unitBtnTextActive,
                  ]}
                >
                  LB
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.bmiCard}>
          <Text style={styles.bmiLabel}>BMI(kg/m²)</Text>
          <Feather name="edit-2" size={16} color="#8E8E93" />
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerBackground: {
    height: 350,
    backgroundColor: '#000',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 15,
    borderRadius: 2,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    zIndex: 10,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 15,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 10,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 20,
    marginTop: -40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0066FF',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 25,
  },
  feelingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  feelingItem: {
    alignItems: 'center',
    flex: 1,
  },
  feelingEmojiBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedBg: {
    backgroundColor: '#FFC107',
  },
  unselectedBg: {
    backgroundColor: '#E0E0E0',
  },
  feelingEmoji: {
    fontSize: 32,
  },
  feelingText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  selectedText: {
    color: '#1A1A1A',
  },
  weightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  weightLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  weightInput: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    padding: 0,
    minWidth: 60,
  },
  weightUnitText: {
    fontSize: 16,
    color: '#1A1A1A',
    flex: 1,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0066FF',
    overflow: 'hidden',
  },
  unitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  unitBtnActive: {
    backgroundColor: '#0066FF',
  },
  unitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066FF',
  },
  unitBtnTextActive: {
    color: '#FFFFFF',
  },
  bmiCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  bmiLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  bottomBar: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
  },
  nextButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
