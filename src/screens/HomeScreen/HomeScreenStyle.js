import {Platform, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;
import {Colors} from './../../assets/colors';
import {FONT_SECONDARY_REGULAR} from '../../utils/typography';

let HomeScreenStyle = {};

HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  //oval shaped

  ovalShape: {
    width: responsiveWidth(100),
    height: responsiveHeight(23),
    backgroundColor: Colors.slatebackground,
    borderBottomEndRadius: responsiveWidth(20),
    borderBottomLeftRadius: responsiveWidth(30),
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },

  baseView: {
    width: 200,
    height: 200,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex can be omitted or set to a lower value
    zIndex: 1,
  },
  overlayView: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'coral',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Higher zIndex to ensure this view is on top
  },
  listMainCtn: {
    marginTop: responsiveHeight(23),
  },
  categorytext: {
    width: responsiveWidth(95),
    marginLeft: responsiveWidth(6),
    fontSize: responsiveFontSize(3.8),
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  nameText: {
    fontSize: responsiveFontSize(3.2),
    fontFamily: 'Rubik-Light',
    lineHeight: responsiveFontSize(3.2),
    color: 'black',
    marginLeft: responsiveWidth(1),
  },
});

export default HomeScreenStyle;
