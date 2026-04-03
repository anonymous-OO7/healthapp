import React, { useContext, useState, useMemo } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { FitnessItems } from '../../context/Context';
import bodyTypes from '../../assets/data/bodyTypes';
import challenges from '../../assets/data/challenges';
import {
  getExercisesByIds,
  calculateTotalDuration,
  calculateTotalCalories,
  getDifficultyColor,
} from '../../utils/exerciseHelper';
import HealthConnectCard from '../../components/molecules/HealthConnect/HealthConnectCard';
import styles from './WorkoutHomeScreen.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WorkoutHomeScreen = () => {
  const navigation = useNavigation();
  const {
    weeklyGoal,
    workoutsCompletedThisWeek,
    currentStreak,
    totalWorkouts,
    getChallengeProgress,
  } = useContext(FitnessItems);

  const [selectedBodyType, setSelectedBodyType] = useState('all');

  const generateWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const days = [];
    const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push({
        day: dayNames[i],
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        isPast: date < today && date.toDateString() !== today.toDateString(),
      });
    }

    return days;
  };

  const weekDays = generateWeekDays();

  const filteredBodyTypes = useMemo(() => {
    if (selectedBodyType === 'all') {
      return bodyTypes;
    }
    return bodyTypes.filter(bt => bt.id === selectedBodyType);
  }, [selectedBodyType]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const handleBodyTypePress = item => {
    const exercises = getExercisesByIds(item.exerciseIds);
    navigation.navigate('Workout', {
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      duration: calculateTotalDuration(item.exerciseIds),
      calories: calculateTotalCalories(item.exerciseIds),
      totalExercises: exercises.length,
      exercises: exercises,
      difficulty: item.difficulty,
      isChallenge: false,
    });
  };

  const handleChallengePress = item => {
    const exercises = getExercisesByIds(item.exerciseIds);
    const progress = getChallengeProgress(item.id);

    navigation.navigate('Workout', {
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      duration: calculateTotalDuration(item.exerciseIds),
      calories: calculateTotalCalories(item.exerciseIds),
      totalExercises: exercises.length,
      exercises: exercises,
      difficulty: item.difficulty,
      isChallenge: true,
      durationDays: item.durationDays,
      badge: item.badge,
      progress: progress,
    });
  };

  const weeklyProgress = Math.min(
    (workoutsCompletedThisWeek / weeklyGoal) * 100,
    100,
  );

  const renderChallengeCard = item => {
    const progress = getChallengeProgress(item.id);
    const isStarted = progress !== null;
    const progressPercent = isStarted
      ? (progress.completedDays.length / item.durationDays) * 100
      : 0;

    return (
      <Pressable
        key={item.id}
        style={styles.challengeCard}
        onPress={() => handleChallengePress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.challengeImage} />
        <View style={styles.challengeOverlay} />

        <View style={styles.challengeBadge}>
          <Text style={styles.challengeBadgeText}>
            {item.durationDays} Days
          </Text>
        </View>

        {isStarted && (
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>
              Day {progress.currentDay}
            </Text>
          </View>
        )}

        <View style={styles.challengeContent}>
          <Text style={styles.challengeTitle}>{item.name}</Text>
          <Text style={styles.challengeSubtitle}>{item.description}</Text>

          {isStarted && (
            <View style={styles.challengeProgressBar}>
              <View
                style={[
                  styles.challengeProgressFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
          )}

          <View style={styles.challengeMeta}>
            <View style={styles.metaItem}>
              <Feather name="activity" size={12} color="#FFFFFF" />
              <Text style={styles.challengeMetaText}>
                {item.exerciseIds.length} exercises
              </Text>
            </View>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(item.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[5]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
            <Text style={styles.mainTitle}>Home Workout</Text>
          </View>
          <View style={styles.topBarRight}>
            <Pressable style={styles.headerIconBtn}>
              <Feather name="bell" size={20} color="#1A1A1A" />
            </Pressable>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png',
              }}
              style={styles.profileImage}
            />
          </View>
        </View>

        <HealthConnectCard />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.statIconText}>🔥</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{currentStreak}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
              <Text style={styles.statIconText}>💪</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{totalWorkouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
              <Text style={styles.statIconText}>🎯</Text>
            </View>
            <View>
              <Text style={styles.statValue}>
                {workoutsCompletedThisWeek}/{weeklyGoal}
              </Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
          </View>
        </View>

        <View style={styles.weeklyGoalCard}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalLabel}>Weekly Goal</Text>
              <Text style={styles.goalProgress}>
                {workoutsCompletedThisWeek} of {weeklyGoal} workouts completed
              </Text>
            </View>
            <Pressable style={styles.editBtn}>
              <Feather name="edit-2" size={16} color="#0066FF" />
            </Pressable>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${weeklyProgress}%` }]}
              />
            </View>
            <Text style={styles.progressPercent}>
              {Math.round(weeklyProgress)}%
            </Text>
          </View>

          <View style={styles.daySelector}>
            {weekDays.map((item, index) => (
              <View key={`day-${index}`} style={styles.dayItem}>
                <Text style={styles.dayText}>{item.day}</Text>
                <View
                  style={[
                    styles.dayNum,
                    item.isToday && styles.dayNumSelected,
                    item.isPast && styles.dayNumPast,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumText,
                      item.isToday && styles.dayNumTextSelected,
                    ]}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View>
          <View style={styles.sectionHeaderWithAction}>
            <Text style={styles.sectionTitle}>🔥 Challenges</Text>
            <Pressable>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengeList}
          >
            {challenges.map(item => renderChallengeCard(item))}
          </ScrollView>
        </View>

        <View style={styles.stickyChipSection}>
          <View style={styles.sectionHeaderWithAction}>
            <Text style={styles.sectionTitle}>💪 Body Focus</Text>
            <Pressable>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>

          <View style={styles.chipRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipContainer}
            >
              <Pressable
                style={[
                  styles.chipItem,
                  selectedBodyType === 'all' && styles.chipItemSelected,
                ]}
                onPress={() => setSelectedBodyType('all')}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    selectedBodyType === 'all' && styles.chipLabelSelected,
                  ]}
                >
                  All
                </Text>
              </Pressable>

              {bodyTypes.map(bt => (
                <Pressable
                  key={bt.id}
                  style={[
                    styles.chipItem,
                    selectedBodyType === bt.id && styles.chipItemSelected,
                  ]}
                  onPress={() => setSelectedBodyType(bt.id)}
                >
                  <Text style={styles.chipIcon}>{bt.icon}</Text>
                  <Text
                    style={[
                      styles.chipLabel,
                      selectedBodyType === bt.id && styles.chipLabelSelected,
                    ]}
                  >
                    {bt.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.workoutsContainer}>
          {filteredBodyTypes.map(item => (
            <Pressable
              key={item.id}
              style={styles.workoutCard}
              onPress={() => handleBodyTypePress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.workoutImage} />

              <View style={styles.workoutContent}>
                <View style={styles.workoutInfo}>
                  <View style={styles.workoutTitleRow}>
                    <Text style={styles.workoutIcon}>{item.icon}</Text>
                    <Text style={styles.workoutTitle}>{item.name}</Text>
                  </View>
                  <Text style={styles.workoutSubtitle}>{item.description}</Text>

                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <Feather name="clock" size={14} color="#8E8E93" />
                      <Text style={styles.workoutMetaText}>
                        {calculateTotalDuration(item.exerciseIds)} mins
                      </Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                      <Feather name="activity" size={14} color="#8E8E93" />
                      <Text style={styles.workoutMetaText}>
                        {item.exerciseIds.length} exercises
                      </Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View
                      style={[
                        styles.workoutDifficultyBadge,
                        {
                          backgroundColor: `${getDifficultyColor(
                            item.difficulty,
                          )}20`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.workoutDifficultyText,
                          { color: getDifficultyColor(item.difficulty) },
                        ]}
                      >
                        {item.difficulty}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.workoutAction}>
                  <MaterialCommunityIcons
                    name="lightning-bolt"
                    size={24}
                    color="#0066FF"
                  />
                </View>
              </View>
            </Pressable>
          ))}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutHomeScreen;
