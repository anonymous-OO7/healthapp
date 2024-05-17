import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,TextInput,ScrollView} from 'react-native';

import SearchPageStyle from './SearchPageStyle';


import {COLORS} from '../../assets/colors.js';


import { windowWidth } from '../../utils/Dimensions';
import SearchBox from '../../components/molecules/SearchBox';





const SearchPage = (props) => {
  return (
    <SafeAreaView style={SearchPageStyle.container}>
      <SearchBox/>
    

    </SafeAreaView>
  );
};

export default SearchPage;
