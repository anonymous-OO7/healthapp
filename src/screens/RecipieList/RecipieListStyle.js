import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";


import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;
import { Colors } from './../../assets/colors';


let RecipieListStyle = {};


RecipieListStyle = StyleSheet.create({

        container: {
            flex:1,
            backgroundColor: 'white',
      
          },
 

 
    })


export default RecipieListStyle 
