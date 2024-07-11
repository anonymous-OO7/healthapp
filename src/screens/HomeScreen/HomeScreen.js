import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import HomeScreenStyle from './HomeScreenStyle';

import LogoViewer from '../../components/common/LogoViewer';

import dataArray from '../../assets/data/data';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import SearchBox from '../../components/molecules/SearchBox';
import SearchClick from '../../components/molecules/SearchClick';
import {PostSvg} from '../../assets/svgs/SvgImages';
import DishCategory from '../../components/molecules/DishCategory';
import CategoryItem from '../../components/molecules/CategoryItem';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {useFocusEffect} from '@react-navigation/native';
import categories from '../../assets/data/categories';
import {useNavigation} from '@react-navigation/core';
import {Colors} from '../../assets/colors';
import {recipies} from '../../assets/data';
import VegNon from '../../components/common/VegNon';
import {
  Help,
  ProteinSvg,
  ShareSvg,
  StarRating,
  WatchlistSvg,
} from '../../assets/images/SvgImages';
import {getGreeting} from '../../utils/UtilFunctions';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const adUnitIdInter = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-2888315269414105/6936250229';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter);

const HomeScreen = props => {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-2888315269414105/9070447874';

  console.log(props, 'PROPS IN Homescreen');
  const navigation = useNavigation();

  const [currentlist, setCurrentlist] = useState(dataArray);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState("all");

  const [loaded, setLoaded] = useState(false);
  const gotoDetail = food => {
    navigation.navigate('DetailsScreen', {
      food: food,
      list: recipies[food.name],
    });
  };
  useFocusEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('ASS LOADED');
        setLoaded(true);
      },
    );
    interstitial.load();
    return unsubscribe;
  }, []);

  const handleFilter = React.useCallback(selected_category => {
    const filteredData =
      selected_category == 'all'
        ? dataArray
        : dataArray.filter(item => {
            return item.category === selected_category;
          });
    setCurrentlist(filteredData);
  }, []);

  if (!loaded) {
    return (
      <>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  const showIntersteialAdd = () => {
    if (loaded) {
      console.log(loaded, 'truee');
      interstitial.show();
      setLoaded(false);
    }
  };

  const changeListRecipies = () => {};
  const Card = ({food}) => {
    return (
      <TouchableHighlight
        underlayColor={Colors.white}
        activeOpacity={0.9}
        onPress={props => {
          showIntersteialAdd();
          console.log('gonit to nextt', props, food);
          gotoDetail(food);
        }}>
        <View style={style.card}>
          <View style={{alignItems: 'center', marginTop: responsiveHeight(1)}}>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // for Android
                borderRadius: responsiveWidth(3),
                backgroundColor: 'transparent',
              }}>
              <Image
                source={{uri: food.image}}
                style={{
                  height: responsiveHeight(15),
                  width: responsiveWidth(40),
                  borderRadius: responsiveWidth(3),
                  backgroundColor: 'bisque',
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginHorizontal: responsiveWidth(8),
              marginTop: responsiveHeight(1),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontFamily: 'Rubik-Regular',
                color: Colors.black,
              }}
              numberOfLines={2} // Limiting the text to 2 lines
            >
              {food.display}
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: Colors.grey,
                marginTop: 2,
                fontFamily: 'Poppins-Regular',
              }}
              numberOfLines={2} // Limiting the text to 2 lines
            >
              {food.category}
            </Text>
          </View>

          <View style={style.infoCtn}>
            <VegNon disabled={food.veg} />

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LogoViewer
                Logosource={StarRating}
                containerstyle={style.loginImgContainer}
                logostyle={style.loginImg}
              />
              <Text style={style.ratingText}>{food.rating}</Text>
            </View>
            <LogoViewer
              Logosource={ProteinSvg}
              containerstyle={style.loginImgContainer}
              logostyle={style.loginImg}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={HomeScreenStyle.ovalShape}>
        <View style={style.header}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={HomeScreenStyle.nameText}>{getGreeting()}</Text>
            </View>
            <Text style={HomeScreenStyle.nameText}>What do you want today</Text>
          </View>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png',
            }}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
        </View>
        <View
          style={{
            marginTop: responsiveHeight(1),
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <SearchClick />
          <View style={style.sortBtn}>
            <LogoViewer
              Logosource={Help}
              containerstyle={style.loginImgContainer}
              logostyle={style.loginImg}
            />
          </View>
        </View>
      </View>
      <View style={HomeScreenStyle.listMainCtn}>
        <Text style={HomeScreenStyle.categorytext}>Top Categories</Text>
      </View>
      <View style={HomeScreenStyle.listMainCtnCat}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.categoriesListContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedCategoryIndex(category.category);
                  handleFilter(category.category);
                }}>
                <View
                  style={{
                    backgroundColor:
                      selectedCategoryIndex == category.category
                        ? Colors.primary
                        : Colors.secondary,
                    ...style.categoryBtn,
                  }}>
                  <View style={style.categoryBtnImgCon}>
                    <Image
                      source={category.image}
                      style={{height: 35, width: 35, resizeMode: 'cover'}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.6),
                      marginLeft: responsiveWidth(1),
                      fontFamily: 'Rubik-Regular',
                      paddingRight: responsiveWidth(2),
                      color:
                        selectedCategoryIndex == category.category
                          ? Colors.white
                          : Colors.primary,
                    }}>
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={currentlist}
          renderItem={({item}) => <Card food={item} props={props} />}
          style={{marginBottom: responsiveHeight(10)}}
        />
      </View>
      <View />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    marginLeft: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
  },
  categoryBtn: {
    height: responsiveHeight(6),
    width: 'auto',
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: responsiveHeight(32),
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: responsiveHeight(1),
    borderRadius: 15,
    elevation: 13,
    backgroundColor: Colors.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCtn: {
    width: 'auto',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
    alignItems:"center"
    
  },
  loginImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(6),
  },
  loginImg: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
  },
  ratingText: {
    color: 'green',
  },
});

export default HomeScreen;
