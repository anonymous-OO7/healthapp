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
  FlatList,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import DishCategory from '../../components/molecules/DishCategory';
import {Colors} from '../../assets/colors';
import dataArray from '../../assets/data/data';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const CategoryItems = props => {
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-2888315269414105/1986148865';


  const categorycurrent = props.route.params?.category;
  console.log(props, categorycurrent, 'props GOR');

  //   const filteredData = dataArray.filter(item => {

  //     console.log(item , "ITEM GOT")

  //     item.category == categorycurrent
  //   }

  //   );

  const [datatemp, setDataTemp] = useState(dataArray);
  const [currentlist, setCurrentlist] = useState([]);

  useEffect(() => {
    const filteredData = dataArray.filter(item => {
      console.log(item, 'ITEM GOT');
      return item.category === categorycurrent;
    });

    console.log(filteredData, 'final list GOT');

    setCurrentlist(filteredData);
  }, []);

  return (
    <View style={styles.containermain}>
        <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
      <FlatList
        data={currentlist}
        // numColumns={2}
        renderItem={({item}) => {
          return <DishCategory props={props} info={item} />;
        }}
        keyExtractor={datatemp => datatemp.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containermain: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CategoryItems;
