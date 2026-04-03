import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { FitnessItems } from '../../../context/Context.js';
import {
  formatExerciseValue,
  getDifficultyColor,
} from '../../../utils/exerciseHelper.js';

const WorkOutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { completed, resetSession, startChallenge, getChallengeProgress } =
    useContext(FitnessItems);

  const {
    id,
    name,
    image,
    description,
    duration,
    calories,
    totalExercises,
    exercises,
    difficulty,
    isChallenge,
    durationDays,
    badge,
  } = route.params;

  const challengeProgress = isChallenge ? getChallengeProgress(id) : null;
  const currentDay = challengeProgress?.currentDay || 1;
  const completedDays = challengeProgress?.completedDays || [];

  const handleStartWorkout = async () => {
    if (isChallenge && !challengeProgress) {
      await startChallenge(id);
    }

    resetSession();
    navigation.navigate('Fit', {
      exercises: exercises,
      workoutId: id,
      workoutName: name,
      isChallenge: isChallenge,
      durationDays: durationDays,
      currentDay: currentDay,
      currentIndex: 0,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image style={styles.headerImage} source={{ uri: image }} />
          <View style={styles.headerOverlay} />

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerContent}>
            {isChallenge && (
              <View style={styles.challengeTag}>
                <Text style={styles.challengeTagEmoji}>{badge}</Text>
                <Text style={styles.challengeTagText}>
                  {durationDays} Day Challenge
                </Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{name}</Text>
            <Text style={styles.headerDescription}>{description}</Text>

            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: `${getDifficultyColor(difficulty)}` },
              ]}
            >
              <Text style={styles.difficultyText}>{difficulty}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#E3F2FD' }]}
            >
              <Feather name="clock" size={20} color="#0066FF" />
            </View>
            <Text style={styles.statValue}>{duration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}
            >
              <Feather name="zap" size={20} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#E8F5E9' }]}
            >
              <Feather name="activity" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{totalExercises}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
        </View>

        {isChallenge && (
          <View style={styles.challengeProgressSection}>
            <Text style={styles.progressSectionTitle}>Challenge Progress</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.daysContainer}
            >
              {Array.from({ length: durationDays }, (_, i) => i + 1).map(
                day => {
                  const isCompleted = completedDays.includes(day);
                  const isCurrent = day === currentDay;

                  return (
                    <View
                      key={day}
                      style={[
                        styles.dayCircle,
                        isCompleted && styles.dayCircleCompleted,
                        isCurrent && styles.dayCircleCurrent,
                      ]}
                    >
                      {isCompleted ? (
                        <AntDesign name="check" size={14} color="#FFFFFF" />
                      ) : (
                        <Text
                          style={[
                            styles.dayCircleText,
                            isCurrent && styles.dayCircleTextCurrent,
                          ]}
                        >
                          {day}
                        </Text>
                      )}
                    </View>
                  );
                },
              )}
            </ScrollView>
          </View>
        )}

        <View style={styles.exerciseSection}>
          <Text style={styles.sectionTitle}>
            {isChallenge ? `Day ${currentDay} Exercises` : 'Exercises'}
          </Text>

          {exercises.map((item, index) => {
            const isExerciseCompleted = completed.includes(item.name);

            return (
              <View key={item.id} style={styles.exerciseCard}>
                <View style={styles.exerciseIndex}>
                  <Text style={styles.exerciseIndexText}>{index + 1}</Text>
                </View>

                <Image
                  style={styles.exerciseImage}
                  source={{ uri: item.image }}
                />

                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <View style={styles.exerciseValueContainer}>
                    <Feather
                      name={item.type === 'time' ? 'clock' : 'repeat'}
                      size={14}
                      color="#8E8E93"
                    />
                    <Text style={styles.exerciseValue}>
                      {formatExerciseValue(item.type, item.value)}
                    </Text>
                    <View style={styles.caloriesBadge}>
                      <Feather name="zap" size={10} color="#FF9800" />
                      <Text style={styles.caloriesText}>
                        {item.calories} cal
                      </Text>
                    </View>
                  </View>
                </View>

                {isExerciseCompleted && (
                  <View style={styles.completedBadge}>
                    <AntDesign name="checkcircle" size={22} color="#4CAF50" />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.startButton} onPress={handleStartWorkout}>
          <Feather name="play" size={20} color="#FFFFFF" />
          <Text style={styles.startButtonText}>
            {isChallenge ? `START DAY ${currentDay}` : 'START WORKOUT'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WorkOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  challengeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  challengeTagEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  challengeTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -30,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 15,
  },
  challengeProgressSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  progressSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  daysContainer: {
    paddingVertical: 5,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  dayCircleCompleted: {
    backgroundColor: '#4CAF50',
  },
  dayCircleCurrent: {
    backgroundColor: '#0066FF',
  },
  dayCircleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
  dayCircleTextCurrent: {
    color: '#FFFFFF',
  },
  exerciseSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  exerciseIndex: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseIndexText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 14,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  exerciseValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseValue: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 5,
  },
  caloriesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
  },
  caloriesText: {
    fontSize: 10,
    color: '#FF9800',
    fontWeight: '600',
    marginLeft: 3,
  },
  completedBadge: {
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  startButton: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
