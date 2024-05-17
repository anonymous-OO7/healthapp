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
import { COLORS } from '../../utils/color';
import { FONT_SECONDARY_REGULAR } from '../../utils/typography';

let HomeScreenStyle = {};

HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
    elevation: 2,
  },
  logoImg: {
    height: responsiveHeight(7),
    width: responsiveWidth(5),
  },
  nameCtn: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1),
  },
  nameText: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'Rubik-Medium',
    lineHeight: responsiveFontSize(3.4),
    color: 'black',
    backgroundColor: 'white',
    width: responsiveWidth(70),
    marginLeft: responsiveWidth(1),
  },
  counterCtn: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
  },
  counterlight: {
    backgroundColor: '#dcdcdc',
  },
  counteractive: {
    backgroundColor: '#007FFF',
  },
  totalclienttext: {
    color: 'black',
  },
  eventtext: {
    color: 'white',
  },

  listingMainCtn: {
    margin: responsiveWidth(2.2),
  },
  listingTitleCtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3.4),
    color: 'black',
  },
  addClientText: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Regular',
    lineHeight: responsiveFontSize(3.4),
    color: '#007FFF',
  },
  searchSection: {
    flex: 1,
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(2.5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    paddingRight: responsiveHeight(1),
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    paddingTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(1),
    backgroundColor: '#fff',
    color: '#424242',
    paddingLeft: responsiveHeight(1),
    paddingRight: responsiveHeight(1),
    borderRadius: responsiveWidth(2.5),
  },
  clientlistCtn: {
    backgroundColor: 'lightseagreen',
  },

  searchMainCtn: {
    display: 'flex',
    flexDirection: 'row',
    width: windowWidth,
    backgroundColor: Colors.slatebackground,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
    marginLeft: responsiveWidth(1),
    position: 'absolute',
    zIndex: 2, // Higher zIndex to ensure this view is on top
  },
  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    borderRadius: responsiveHeight(6),
    marginLeft: responsiveWidth(2),
    elevation: 10,
  },
  item: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
  },

  image: {
    flex: 1,
    transform: [{scale: 1.5}],
  },

  //oval shaped

  ovalShape: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),
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

  headingText: {
    width: responsiveWidth(95),
    marginTop: responsiveHeight(10),
    marginLeft: responsiveWidth(6),
    zIndex: 2, // Higher zIndex to ensure this view is on top
    fontSize: responsiveFontSize(3),
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  listMainCtn: {
    marginTop: responsiveHeight(6),
  },
  categorytext: {
    width: responsiveWidth(95),
    marginLeft: responsiveWidth(6),
    fontSize: responsiveFontSize(3.8),
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  listMainCtnCat: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-around', // Distribute children evenly
    alignItems: 'flex-start',
  },

  //new styles
  introContainer: {
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  introUserText: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.lightGrey,
    paddingBottom: 3,
  },
  introCaption: {
    fontSize: 20,
    lineHeight: 28,
    color: COLORS.black,
    paddingTop: 3,
    paddingBottom: 3,
    fontFamily: FONT_SECONDARY_REGULAR,
  },
  searchBarContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    width: Dimensions.get('window').width - 100,
  },
  borderLine: {
    height: 1,
    backgroundColor: COLORS.superLight,
    marginTop: 16,
    marginBottom: 16,
  },
});

export default HomeScreenStyle;
