// screens/Report/ReportScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { FitnessItems } from '../../context/Context';

const ReportScreen = () => {
  const { workout, calories, minutes, weight, BMI } = useContext(FitnessItems);

  const statsData = [
    {
      icon: <FontAwesome5 name="medal" size={30} color="#0066FF" />,
      value: workout,
      label: 'Workout',
    },
    {
      icon: <FontAwesome5 name="fire-alt" size={30} color="#0066FF" />,
      value: calories,
      label: 'Kcal',
    },
    {
      icon: <Feather name="clock" size={30} color="#0066FF" />,
      value: minutes,
      label: 'Minute',
    },
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = [22, 23, 24, 25, 26, 27, 28]; // Placeholder days

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>REPORT</Text>

        {/* Top Stats */}
        <View style={styles.statsContainer}>
          {statsData.map((item, index) => (
            <View key={index} style={styles.statItem}>
              {item.icon}
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.subHeader}>History</Text>
          <Text style={styles.historySubText}>All records</Text>

          <View style={styles.calendarContainer}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.calendarDay}>
                <Text style={styles.calendarTextDay}>{day}</Text>
                {index === 1 ? (
                  <View style={styles.calendarTextNumSelected}>
                    <Text style={{ color: 'white' }}>
                      {calendarDays[index]}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.calendarTextNum}>
                    {calendarDays[index]}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Day Streak & Personal Best (Fake for now) */}
          <View style={styles.streakContainer}>
            <View style={styles.streakItem}>
              <FontAwesome5 name="fire-alt" size={20} color="#0066FF" />
              <Text style={styles.streakValue}>0</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
            <View style={styles.streakItem}>
              <Text style={styles.streakValue}>1 day</Text>
              <Text style={styles.streakLabel}>Personal Best</Text>
            </View>
          </View>
        </View>

        {/* Weight Log Section */}
        <View style={styles.weightSection}>
          <View style={styles.weightHeader}>
            <Text style={styles.subHeaderWeight}>Weight</Text>
            <Pressable style={styles.logButton}>
              <Text style={styles.logButtonText}>Log</Text>
            </Pressable>
          </View>

          <View style={styles.weightChart}>
            <Text style={styles.weightLogText}>Current</Text>
            <Text style={styles.currentWeight}>{weight} kg</Text>
            {/* Simulation of chart and x-axis labels */}
            <View style={styles.chartYAxis}>
              <Text>79.2</Text>
              <Text>79</Text>
              <Text>78.8</Text>
              <Text>78.6</Text>
              <Text>78.4</Text>
            </View>
            <View style={styles.chartXAxis}>
              <Text>05</Text>
              <Text>06</Text>
              <Text>07</Text>
              <Text>08</Text>
              <Text>09</Text>
            </View>
            {/* Chart Point */}
            <View style={styles.weightPoint} />
          </View>
        </View>

        {/* BMI Section */}
        <View style={styles.bmiSection}>
          <View style={styles.bmiHeader}>
            <Text style={styles.subHeaderBMI}>BMI</Text>
            <Pressable style={styles.logButton}>
              <Text style={styles.logButtonText}>Edit</Text>
            </Pressable>
          </View>

          <Text style={styles.currentBMI}>{BMI}</Text>
          <Text style={styles.currentBMIStatus}>
            <View style={styles.bmiStatusDot} /> Healthy weight
          </Text>
          {/* Simulated BMI slider */}
          <View style={styles.bmiSliderContainer}>
            {/* ... slider implementation ... */}
          </View>
        </View>

        {/* Advertisement simulation */}
        <View style={styles.adSimulation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  statLabel: { fontSize: 12, color: 'gray', marginTop: 4 },
  subHeader: { fontSize: 20, fontWeight: 'bold' },
  historySection: { marginHorizontal: 20, marginBottom: 20 },
  historySubText: {
    fontSize: 14,
    color: '#0066FF',
    textAlign: 'right',
    marginTop: -20,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  calendarDay: { alignItems: 'center' },
  calendarTextDay: {
    fontSize: 12,
    color: 'gray',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  calendarTextNum: { fontSize: 14, color: 'black' },
  calendarTextNumSelected: {
    backgroundColor: '#0066FF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  streakItem: { alignItems: 'center', width: '45%' },
  streakValue: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  streakLabel: { fontSize: 12, color: 'gray', marginTop: 4 },
  weightSection: { marginHorizontal: 20, marginBottom: 20 },
  weightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeaderWeight: { fontSize: 20, fontWeight: 'bold' },
  logButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  logButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  weightChart: {
    marginTop: 15,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
  },
  weightLogText: { fontSize: 14, color: 'gray' },
  currentWeight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  chartYAxis: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    position: 'absolute',
    top: 50,
  },
  chartXAxis: { alignSelf: 'flex-end', marginRight: 10 },
  weightPoint: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0066FF',
    borderWith: 2,
    borderColor: '#eee',
    position: 'absolute',
    top: 60,
    right: 30,
  },
  bmiSection: { marginHorizontal: 20, marginBottom: 20 },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeaderBMI: { fontSize: 20, fontWeight: 'bold' },
  currentBMI: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  currentBMIStatus: {
    fontSize: 14,
    color: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bmiStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'cyan',
    marginRight: 5,
  },
  bmiSliderContainer: {
    marginVertical: 15,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  adSimulation: {
    height: 50,
    backgroundColor: '#eee',
    margin: 20,
    borderRadius: 10,
  }, // Simulated ad
});
