import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import InputBox from '../common/InputBox';

const SearchBox = ({onSearch}) => {


  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };


  return (
    <View style={SearchBoxstyles.container}>
      <TextInput
        style={SearchBoxstyles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity onPress={handleSearch} style={SearchBoxstyles.searchButton}>
      </TouchableOpacity>
    </View>
  );
};

const SearchBoxstyles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  searchButton: {
    padding: 10,
  },



});

export default SearchBox;
