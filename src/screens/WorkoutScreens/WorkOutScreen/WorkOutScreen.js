import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FitnessItems } from '../../../context/Context';

const WorkOutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(FitnessItems);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Image
          style={styles.headerImage}
          source={{ uri: route.params.image }}
        />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
          name="arrow-back-outline"
          size={28}
          color="white"
        />

        {route.params.excersises.map((item, index) => (
          <Pressable style={styles.exerciseContainer} key={index}>
            <Image style={styles.exerciseImage} source={{ uri: item.image }} />

            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseName}>{item.name}</Text>

              <Text style={styles.exerciseSets}>x{item.sets}</Text>
            </View>

            {completed.includes(item.name) ? (
              <AntDesign
                style={styles.checkIcon}
                name="checkcircle"
                size={24}
                color="green"
              />
            ) : null}
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate('Fit', {
            excersises: route.params.excersises,
          });
          setCompleted([]);
        }}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>START</Text>
      </Pressable>
    </>
  );
};

export default WorkOutScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    marginTop: 50,
  },
  headerImage: {
    width: '100%',
    height: 170,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  exerciseContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 90,
    height: 90,
  },
  exerciseDetails: {
    marginLeft: 10,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: 'bold',
    width: 170,
  },
  exerciseSets: {
    marginTop: 4,
    fontSize: 18,
    color: 'gray',
  },
  checkIcon: {
    marginLeft: 40,
  },
  startButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    width: 120,
    borderRadius: 6,
  },
  startButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
