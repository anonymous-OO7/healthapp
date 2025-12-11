import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import fitness from '../../assets/data/fitness';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();

  return (
    <View>
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() =>
            navigation.navigate('Workout', {
              image: item.image,
              excersises: item.excersises,
              id: item.id,
            })
          }
          style={styles.cardContainer}
          key={key}
        >
          <Image style={styles.cardImage} source={{ uri: item.image }} />
          <Text style={styles.cardTitle}>{item.name}</Text>
          <MaterialCommunityIcons
            style={styles.iconStyle}
            name="lightning-bolt"
            size={24}
            color="white"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  cardImage: {
    width: '95%',
    height: 140,
    borderRadius: 7,
  },
  cardTitle: {
    position: 'absolute',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    left: 20,
    top: 20,
  },
  iconStyle: {
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
});
