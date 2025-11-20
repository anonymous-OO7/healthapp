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


let AccountSetupStyle = {};


AccountSetupStyle = StyleSheet.create({

        container: {
            flex:1,
            backgroundColor: 'white',
      
          },
          headingCtn:{
            backgroundColor: 'white',
            marginTop:responsiveHeight(5)
          },
          buttonCtn:{
            marginLeft:responsiveWidth(8),
            width:responsiveWidth(80),
            justifyContent:"center"

            

          },
          view1:{

            flex:1,
            backgroundColor: 'white',
          },
          view2:{

            backgroundColor: 'white',
            marginBottom:responsiveHeight(2)
          }
    })


export default AccountSetupStyle 
