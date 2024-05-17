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
import InputBox from '../common/InputBox';
import {windowWidth} from '../../utils/Dimensions';
import {Colors} from '../../assets/colors';
import VegNon from '../common/VegNon';
import LogoViewer from '../common/LogoViewer';
import {StarRating, ProteinSvg} from '../../assets/svgs/SvgImages';
const DishCategory = ({props, info, showIntersteialAdd}) => {
  const {
    name,
    categories,
    deliveryTime,
    distance,
    image,
    display,
    desc,
    veg,
    rating,
  } = info;

  let recipies = {
    breakfast: [
      'duoVN7_uRFI',
      'VzEvPVL16uc',
      'td4lg9O9JZM',
      '8wfZdhP-AEI',
      '0pYv9rakqGM',
      'pqpDYRZ3pYQ',
      'NGczXTp8FL4',
      'irHa5fIGxE0',
    ],
    lunch: [
      'YwqHCDEW_uQ',
      'BiO1SXyRAs4',
      'nfzgVy9AjDs',
      'wlkX7GXyOcs',
      'tAm5bSKEDvQ',
      'hcGrv_KX7qA',
      'QUXXgmCr6oI',
    ],
    pakora: [
      'Pr5i9K6I5bs',
      'P_W5Tj6gEZQ',
      'MYN093CqEHQ',
      '7B5KEtf37ec',
      'nprmg1yz2vg',
    ],
    chaat: [
      'mMdhuvi0',
      'eFDwHxsfvWM',
      'q35tKgg6jgg',
      'aYADGsh0Gww',
      'rX1duTFa-LI',
      'UIopaItui_0',
      'jkJGteee_ak',
      '_eA_41QmaC4',
    ],

    vadapav: ['58cHgDaw', 'C4pzmjHgqLw', 'r4saZD0J_gU', 'nENvM_ksQf8'],
    idli: [
      'dcMlG1UA-jU',
      'JuTpG3CRVkI',
      '0O1PvPR6Q2c',
      'OzNeKubj0ng',
      'BL8JiT7Vlcg',
    ],
    paratha: [
      'xVl8StjYMuc',
      'O9Bmjbq_g_c',
      'shWX0G0rW4',
      'A3xF2Tds-vg',
      '00cc4HzxCok',
      'A3xF2Tds-vg',
      'CUixu0aNzCc',
    ],

    aloogobhi: [
      'KMVI7NHcbNE',
      'PhgyyJE90w8',
      'pQn25oWpw_g',
      'JwXMFnHUVfQ',
      'JihdOvkxQC8',
    ],

    butterchiken: [
      'JxSwBpEiYeQ',
      'VHfhCXkJh34',
      'a03U45jFxOI',
      'bX7AyuNMrVY',
      'a03U45jFxOI',
      '6tMUbWjEWiY',
    ],

    daltadka: [
      'OSDf7jE9R9A',
      'r9BBNT3vOGw',
      'dqdYZu04q9I',
      '8c_scYUN5uc',
      'GzAdszSsJ4g',
    ],
    masaladosa: [
      'gY1LXg8AnU4',
      'J75VQSxOtdo',
      'sX5pYdNbmgo',
      'PFG1aeYgi7c',
      '2Tp78cWy80w',
    ],

    sambhar: [
      'EkJC0GgY5wk',
      '0Vp_vhau_Js',
      'kiPPk2UFxv0',
      'XvvObytWWSc',
      'DFopKA30X5c',
    ],

    dalmakhni: [
      'f1lpCi_70sQ',
      'mA5XjhdwJHc',
      'o3k55z-tv9I',
      'OA1UuT_5PJ8',
      'ca51e7nMI2g',
    ],

    chanamasala: [
      'M-ohmJswy6A',
      '4wXeMbTjCE',
      'iKMI1xkU_oo',
      '3Vf5_St-DEo',
      'EL9X-P98m2Q',
    ],

    shaipaneer: [
      'G3-EASdBTOU',
      'inVClSNYBQ4',
      'W3GlgT47U-w',
      'EbpSHiRRK7I',
      'NftwSFnzTAg',
    ],

    roganjosh: ['ZaZNZdehT0E', 'g_hvkyYPAMQ', 'ZaZNZdehT0E'],
    tandurichiken: [
      'A3lcRok1zf8',
      'ieWpaZXi_Vo',
      'ieWpaZXi_Vo',
      'Ec_u7AMBtZI',
      'ShNrmPtW8G0',
      'V7nqwcVBaBs',
    ],

    vinadaloo: [
      'gJQTjIxZSms',
      '7KDt6ZDYJpQ',
      '6nqsPZ1sjc4',
      '06kiyyiUhuU',
      'SC8vEAJmtoY',
    ],

    malabarfishcurry: [
      '7_PcF2WwM',
      'Z4vJBZkOO14',
      'RxXS2QVmMVg',
      'Omkztx5rHBM',
      '6lUOWz8rULY',
    ],

    biriyani: [
      'jjmR9C_X7LY',
      '95BCU1n268w',
      'YTYtKuLwl9U',
      'E_gWBBjYkjE',
      '6XlMguO9r-M',
    ],

    samosa: [
      'EKPAfUCn_Jo',
      'IEdVmXpjGcI',
      'JgV8j4N73uc',
      'AAm95jaoAJc',
      '3OZn-iCGf5s',
      'W0zDu1o74Uc',
    ],
    rasmalai: [
      'znefLMNyVE8',
      '9mm8my_NLlY',
      'LECpZPkP9Wk',
      '9mm8my_NLlY',
      '_tDTAfrVIRc',
      'B34vrOtsFII',
    ],
    kulfi: [
      'f6D7A6-QNl8',
      '34TQWHf_e8s',
      '6LHoeSrR6Zk',
      'anCXzrggN98',
      'wUBWl8baJjQ',
    ],

    gulabjamun: [
      'QFvd7u_YjVk',
      'VVhs1wj9DhU',
      'aUFO-YnWslw',
      'L-aS3XKW0ew',
      'CE1ne6zc5nA',
    ],

    barfi: [
      'ktREiOWb_Bw',
      '9Ie2ncXp1Wc',
      'LxC3OVfXihw',
      'DaM1hN70lvk',
      'KDzHcXAOQSw',
    ],

    lassi: [
      'g4As2DDoUVI',
      'SlqpgRCdSyo',
      'vKn1b9G1BjE',
      'kJxBtbjTef0',
      'c_IxCZrrHh8',
      'MX2F5rQwpsM',
    ],
    pastas: [
      'yVDz0Av-s2A',
      'eQKxA4Fca-c',
      'SoPgnUZMBXU',
      'MGFMf1e_j8',
      '3mKugV29AOo',
      'bcnPfcJnYr0',
    ],

    fruitjuices: [
      'HYeGy9yTbsM',
      'DqeBeDwVX6Y',
      'ljagZW5tY-8',
      'RXHQn2mGLbs',
      'WlxOy62n584',
    ],

    naan: [
      'uBmiX-fer5o',
      'X59JECzaUU4',
      'X59JECzaUU4',
      'WnkTTvAVisU',
      'ls36bJs9-YI',
    ],
  };

  // <ImageBackground source={image} resizeMode="contain" style={DishCategorystyles.imageStyle}>
  // {/* <Image style={DishCategorystyles.imageStyle} source={image} /> */}

  // <View style={DishCategorystyles.infoStyle}>

  //   <Text style={DishCategorystyles.titleStyle}>{display}</Text>
  //   <Text style={DishCategorystyles.categoryStyle}>{categories}</Text>

  //   <View style={DishCategorystyles.iconLabelStyle}>
  //     {/* <IconLabel name="ios-time" label={deliveryTime} color={iconColor} />
  //     <IconLabel name="ios-pin" label={distance} color={iconColor} /> */}
  //   </View>

  // </View>

  // </ImageBackground>

  return (
    // <TouchableOpacity
    //   onPress={() => {
    //     props.navigation.navigate('RecipieList', {
    //       info: info,
    //       list: recipies[name],
    //     });
    //   }}
    //   style={DishCategorystyles.child}>
    //   <View style={DishCategorystyles.container}>
    //     <View style={DishCategorystyles.cardContainer}>
    //       <View style={DishCategorystyles.imageCtn}>
    //         <TouchableOpacity style={DishCategorystyles.profileButton}>
    //           <Image
    //             style={DishCategorystyles.image}
    //             resizeMode="contain"
    //             source={image}
    //           />
    //         </TouchableOpacity>
    //       </View>

    //       <View style={DishCategorystyles.infoMainctn}>
    //         <Text style={DishCategorystyles.titleStyle}>{display}</Text>
    //         <Text style={DishCategorystyles.categoryStyle}>{desc}</Text>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>

    <View style={DishCategorystyles.containermain}>
      <TouchableOpacity
        style={DishCategorystyles.card}
        onPress={() => {
          showIntersteialAdd();

          // props.navigation.navigate('RecipieList', {
          //   info: info,
          //   list: recipies[name],
          // });

          props.navigation.navigate('DetailsPage', {
            info: info,
            list: recipies[name],
          });
        }}>
        <View style={DishCategorystyles.container}>
          <View style={DishCategorystyles.cardContainer}>
            <View style={DishCategorystyles.profileButton}>
              <Image
                style={{
                  width: responsiveWidth(25),
                  height: responsiveWidth(25),
                }}
                resizeMode="contain"
                source={{uri: image}}
              />
            </View>

            <View style={DishCategorystyles.infoMainctn}>
              <Text style={DishCategorystyles.titleStyle}>{display}</Text>
              <Text style={DishCategorystyles.categoryStyle}>{desc}</Text>
            </View>
          </View>
        </View>

        <View style={DishCategorystyles.infoCtn}>
          <VegNon disabled={veg} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LogoViewer
              Logosource={StarRating}
              containerstyle={DishCategorystyles.loginImgContainer}
              logostyle={DishCategorystyles.loginImg}
            />
            <Text style={DishCategorystyles.ratingText}>{rating}</Text>
          </View>

          <LogoViewer
            Logosource={ProteinSvg}
            containerstyle={DishCategorystyles.loginImgContainer}
            logostyle={DishCategorystyles.loginImg}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;

const DishCategorystyles = StyleSheet.create({
  containermain: {
    display: 'flex',
    width: responsiveWidth(100),
    marginTop: responsiveHeight(2),
  },
  categoryCtn: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: radius,
  },
  child: {
    flexBasis: '100%',
    borderRadius: radius,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: responsiveWidth(1),
    marginLeft: responsiveWidth(1),
    width: deviceWidth - 20,
    alignItems: 'center',
    borderRadius: radius,
    backgroundColor: 'white',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: deviceWidth - offset,
    backgroundColor: 'white',
    borderRadius: radius,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 5,
    // elevation: 9,
  },
  imageStyle: {
    height: responsiveHeight(20),
    width: deviceWidth - offset,
    // borderTopLeftRadius: radius,
    // borderTopRightRadius: radius,
    borderRadius: radius,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik-Medium',
    lineHeight: responsiveFontSize(3.4),
    color: Colors.black,
    marginLeft: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
  },
  categoryStyle: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Rubik-Medium',
    color: 'black',
    marginLeft: responsiveWidth(3),
  },
  infoStyle: {
    backgroundColor: '#90ee90',
    marginHorizontal: responsiveWidth(2),
    marginVertical: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageCtn: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(5),
    padding: responsiveWidth(1.5),
  },
  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(18),
    width: responsiveHeight(18),
    borderRadius: responsiveHeight(1),
    marginRight: responsiveWidth(1),
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

  infoMainctn: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    marginRight: responsiveWidth(4),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // for Android
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    // height: 150,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },

  infoCtn: {
    width: windowWidth,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(1),
  },
  loginImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(8),
  },
  loginImg: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
  },
  ratingText: {
    color: 'green',
  },
});

export default DishCategory;
