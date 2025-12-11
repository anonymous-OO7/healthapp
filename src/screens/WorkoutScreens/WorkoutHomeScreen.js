import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useContext } from 'react';
import FitnessCards from '../../components/molecules/FitnessCards';
import { FitnessItems } from '../../context/Context';
import styles from './WorkoutHomeScreen.styles';

const WorkoutHomeScreen = () => {
  const { minutes, calories, workout } = useContext(FitnessItems);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#CD853F" barStyle="light-content" />

      <View style={styles.fixedHeader}>
        <Text style={styles.headerText}>HOME WORKOUT</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{workout}</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>KCAL</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{minutes}</Text>
            <Text style={styles.statLabel}>MINS</Text>
          </View>
        </View>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsWrapper}>
            <Image
              style={styles.bannerImg}
              resizeMode="cover"
              source={{
                uri: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png',
              }}
            />
            <FitnessCards />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutHomeScreen;
