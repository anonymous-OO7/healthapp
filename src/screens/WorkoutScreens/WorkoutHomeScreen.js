import React, { useContext, useState, useMemo } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
        stickyHeaderIndices={[4]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Child 0: Top Bar */}
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

        {/* Child 1: Stats Row */}
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

        {/* Child 2: Weekly Goal Card */}
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

        {/* Child 3: Challenges Section */}
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

        {/* Child 4: Body Focus Sticky Section */}
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

        {/* Child 5: Workout Cards */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  topBarLeft: {
    flex: 1,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
    marginBottom: 2,
  },
  mainTitle: {
    fontSize: 22,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  headerIconBtn: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginRight: 10,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statIconText: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 10,
  },
  weeklyGoalCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  goalLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  editBtn: {
    padding: 8,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    borderRadius: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066FF',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066FF',
    width: 35,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },
  dayNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  dayNumSelected: {
    backgroundColor: '#0066FF',
  },
  dayNumPast: {
    backgroundColor: '#E8F5E9',
  },
  dayNumText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  dayNumTextSelected: {
    color: '#FFFFFF',
  },
  sectionHeaderWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0066FF',
    fontWeight: '600',
  },
  stickyChipSection: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  chipRow: {
    height: 50,
  },
  chipContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 45,
  },
  chipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  chipItemSelected: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  chipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  chipLabelSelected: {
    color: '#FFFFFF',
  },
  challengeList: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  challengeCard: {
    width: SCREEN_WIDTH * 0.75,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  challengeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  challengeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  challengeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 102, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  challengeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  progressBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  challengeContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  challengeProgressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeMetaText: {
    fontSize: 11,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  workoutsContainer: {
    paddingTop: 5,
  },
  workoutCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  workoutImage: {
    width: '100%',
    height: 140,
  },
  workoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  workoutIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  workoutSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 10,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutMetaText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 5,
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 10,
  },
  workoutDifficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  workoutDifficultyText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  workoutAction: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
