import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const CategoryItem = ({props, title, image, category,showIntersteialAdd}) => {
  console.log(title, image, props, 'PRoPS OF CAt');

  const propsc = props.props;
  return (
    <TouchableOpacity
      onPress={() => {
        showIntersteialAdd()
        propsc.navigation.navigate('CategoryItems', {
          category: category,
        });
      }}
      style={styles.containermain}>
      <View style={styles.profileButton}>
      <Image 
        source={{ uri: image }} 
        style={{ width: responsiveWidth(25), height: responsiveWidth(25) }}
        resizeMode="contain"
      />
        {/* <Image style={styles.image} resizeMode="contain" source={{uri:"https://st.depositphotos.com/1144352/3656/i/450/depositphotos_36567413-stock-photo-pizza.jpg"}} /> */}
      </View>

      <Text style={styles.categoryStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containermain: {
    display: 'flex',
    width: responsiveWidth(40),
    marginTop: responsiveHeight(2),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(10),
    width: responsiveHeight(12),
    borderRadius: responsiveHeight(1),
    marginTop: responsiveHeight(2),
  },
  image: {
    flex: 1,
    transform: [{scale: 1.2}],
  },

  categoryStyle: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Rubik-Medium',
    color: 'black',
    marginTop: responsiveHeight(1),
  },
});

export default CategoryItem;
