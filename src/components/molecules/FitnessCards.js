// components/molecules/FitnessCards.js
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
// Note: Import the data file you created in Step 1
import fitnessData from '../../assets/data/fitness';

const FitnessCards = () => {
  const navigation = useNavigation();

  return (
    <View>
      {fitnessData.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate('Workout', { exercises: item.exercises })
          }
          style={styles.cardContainer}
          key={index}
        >
          <View style={styles.cardLeft}>
            <Image style={styles.cardImage} source={{ uri: item.image }} />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={24}
            color="#0066FF"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 7,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  cardImage: { width: 40, height: 40, borderRadius: 5, marginRight: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
});
