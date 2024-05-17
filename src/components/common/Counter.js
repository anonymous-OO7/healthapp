import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet} from 'react-native';




import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import WatchlistIcon from '../../assets/images/tabbar/WatchlistIcon';
import Watchlist from '../../assets/images/Watchlist.svg'



const Counter = ({disabled = true, onclick=  () => {console.log("checking  default logingg in!");} , buttonctn , clientstyle, clientnumberstyle ,countertitle="Button",countervalue="Button"}) => {

  return (


     <View style={[Counterstyles.container,buttonctn]} >


            <View>
                    <Watchlist/>
            </View>

            <View style={Counterstyles.textCtn}>
                <Text style={[Counterstyles.clientText,clientstyle]}>{countertitle}</Text>
                <Text style={[Counterstyles.clientNumberText,clientnumberstyle]}>{countervalue}</Text>

            </View>
     </View>

   

    

  );
};

  


const Counterstyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"row",
      padding: responsiveWidth(2),
      alignItems:"center",
      justifyContent:"space-around",
      borderRadius:responsiveHeight(2),
      margin:responsiveWidth(3)
    },
    textCtn:{

    },
    clientText:{
        fontSize:responsiveFontSize(2),
        fontFamily:'Rubik-Regular',
        lineHeight:responsiveFontSize(3),
        color:"black",
    },
    clientNumberText:{
        fontSize:responsiveFontSize(3),
        fontFamily:'Rubik-Medium',
        color:"black",
    }
  
  });

export default Counter;
