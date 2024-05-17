
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
import { SearchSvg } from '../../assets/svgs/SvgImages';
import LogoViewer from '../common/LogoViewer';





const SearchClick = ({onSearch}) => {


  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };


  return (
    <TouchableOpacity style={SearchClickstyles.container}>

    <LogoViewer
          Logosource={SearchSvg}
          containerstyle={SearchClickstyles.logoImgContainer}
          logostyle={SearchClickstyles.logoImg}
        />

    <Text style={SearchClickstyles.searchText} >Search your Lesson</Text>
   
    </TouchableOpacity>
  );
};

const SearchClickstyles = StyleSheet.create({

  container: {
    display:'flex',
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#F2F3F8",
    width:"70%",
    height:responsiveHeight(6),
    borderRadius:responsiveWidth(5),
    marginLeft:responsiveWidth(1),
    elevation:5
  },
  logoImgContainer:{
    backgroundColor:"#F2F3F8",
    borderRadius:responsiveWidth(5),
    marginLeft:responsiveWidth(1),
    alignItems:"center",
    justifyContent:"center",
    height:responsiveHeight(6),
    width:responsiveWidth(10),
  },
  logoImg:{
    height:responsiveHeight(7),
    width:responsiveWidth(5),

  },
searchText:{
    fontSize:responsiveFontSize(1.5),
    fontFamily:'Poppins-Regular',
    lineHeight:responsiveFontSize(3.4),
    color:"#8193AB",

}
});

export default SearchClick;
