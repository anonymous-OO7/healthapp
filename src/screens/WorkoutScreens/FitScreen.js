import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { FitnessItems } from '../../context/Context';

const FitScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  console.log(current, 'first excersise');

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);
  console.log(completed, 'completed excersise');

  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={styles.exerciseImage}
        source={{
          uri: current.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text style={styles.exerciseName}>{current.name}</Text>

      <Text style={styles.exerciseSets}>x{current.sets}</Text>

      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.doneButton}
        >
          <Text style={styles.doneButtonText}>DONE</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate('Rest');
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={styles.doneButton}
        >
          <Text style={styles.doneButtonText}>DONE</Text>
        </Pressable>
      )}

      <View style={styles.navigationContainer}>
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate('Rest');
            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={[styles.navButton, index === 0 && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>PREV</Text>
        </Pressable>

        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>SKIP</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate('Rest');
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>SKIP</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  exerciseImage: {
    width: '100%',
    height: 370,
  },
  exerciseName: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  exerciseSets: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    fontSize: 38,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: 'blue',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    width: 150,
  },
  doneButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  navButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    width: 100,
  },
  navButtonDisabled: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
