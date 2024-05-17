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
} from 'react-native';

import HomeScreenStyle from './HomeScreenStyle';
import Button from '../../components/common/Button';

import {NameSvg} from '../../assets/svgs/SvgImages';
import LogoViewer from '../../components/common/LogoViewer';
import Counter from '../../components/common/Counter';
import SearchIcon from '../../assets/svgs/searchicon.svg';

import {COLORS} from '../../assets/colors.js';
import dataArray from '../../assets/data/data';
import {windowWidth} from '../../utils/Dimensions';
import SearchBox from '../../components/molecules/SearchBox';
import SearchClick from '../../components/molecules/SearchClick';
import {PostSvg} from '../../assets/svgs/SvgImages';
import DishCategory from '../../components/molecules/DishCategory';
import CategoryItem from '../../components/molecules/CategoryItem';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {useFocusEffect} from '@react-navigation/native';

const adUnitIdInter = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-2888315269414105/6936250229';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter);

const HomeScreen = props => {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-2888315269414105/9070447874';

  console.log(props, 'PROPS IN Homescreen');

  // https://www.rainforestcruises.com/guides/india-food#:~:text=Traditional%20Indian%20food%20is%20renowned,%2C%20chutneys%2C%20breads%20and%20sweets.

  const [currentlist, setCurrentlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    const filteredData = dataArray.filter(item => {
      console.log(item, 'ITEM GOT');
      return item.istop === true;
    });

    console.log(filteredData, 'final list GOT');

    setCurrentlist(filteredData);
  }, []);

  if (!loaded) {
    return null;
  }

  const showIntersteialAdd = () => {
    if (loaded) {
      console.log(loaded, 'truee');
      interstitial.show();

      setLoaded(false);
    }
  };
  return (
    <SafeAreaView style={HomeScreenStyle.container}>
      <View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
        <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
          <View style={HomeScreenStyle.ovalShape} />
          {/* Rest of your content */}
          <View style={HomeScreenStyle.searchMainCtn}>
            <TouchableOpacity
              onPress={() => {
                interstitial.show();
              }}
              style={HomeScreenStyle.profileButton}>
              <Image
                // style={HomeScreenStyle.image}
                style={{
                  width: responsiveWidth(17),
                  height: responsiveWidth(12),
                }}
                resizeMode="contain"
                source={{
                  uri: 'https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg',
                }}
              />
            </TouchableOpacity>
            <SearchClick />
            <TouchableOpacity>
              <LogoViewer
                Logosource={PostSvg}
                containerstyle={HomeScreenStyle.logoImgContainer}
                logostyle={HomeScreenStyle.logoImg}
              />
            </TouchableOpacity>
          </View>

          <Text style={HomeScreenStyle.headingText}>
            Find best recipes for cooking
          </Text>
        
          <View style={HomeScreenStyle.searchBarContainer}>
          </View>
          <View style={HomeScreenStyle.listMainCtn}>
            <Text style={HomeScreenStyle.categorytext}>Top Categories</Text>
          </View>

          <View style={HomeScreenStyle.listMainCtnCat}>
            <View>
              <CategoryItem
                title={'Northindian'}
                image={
                  'https://t4.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9upAWW5Rdsa4UE0CV6gRu2CwUETjzbKy.jpg'
                }
                props={props}
                category={'northindian'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Breakfast'}
                image={
                  'https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Full-English-Breakfast.jpg'
                }
                props={props}
                category={'breakfast'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Biriyani'}
                image={
                  'https://c8.alamy.com/comp/C96752/indian-chicken-biryani-C96752.jpg'
                }
                props={props}
                category={'biriyani'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Pizza'}
                image={
                  'https://st.depositphotos.com/1144352/3656/i/450/depositphotos_36567413-stock-photo-pizza.jpg'
                }
                props={props}
                category={'pizza'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Fried rice'}
                image={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY2BEkErXYKCFXv4dlSJFMKxDdyKHXJEh4KQ&usqp=CAU'
                }
                props={props}
                category={'friedrice'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Cake'}
                image={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6OBNLc9qk6KUtcVXU5oGDwGpUIsUgZxGNXw&usqp=CAU'
                }
                props={props}
                category={'cake'}
                showIntersteialAdd={showIntersteialAdd}
              />
            </View>

            <View>
              <CategoryItem
                title={'Coffee'}
                image={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wZlNlZj2nmBMyhV56cpTudHm9Bc4ab0BxA&usqp=CAU'
                }
                props={props}
                category={'coffee'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Lunch'}
                image={
                  'https://img.freepik.com/premium-photo/indian-hindu-veg-thali-also-known-as-food-platter-is-complete-lunch-dinner-meal-closeup-selective-focus_466689-9082.jpg'
                }
                props={props}
                category={'lunch'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Sweet'}
                image={
                  'https://st.depositphotos.com/2702761/3312/i/450/depositphotos_33121705-stock-photo-traditional-indian-sweets.jpg'
                }
                props={props}
                category={'sweet'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Snack'}
                image={
                  'https://cablevey.com/wp-content/uploads/2020/11/What-Are-the-Different-Kinds-of-Snack-Foods.jpg'
                }
                props={props}
                category={'snack'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Pickle'}
                image={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndIjfGD67GAW8B2ukQGOtjLFTHB6zrxAinA&usqp=CAU'
                }
                props={props}
                category={'pickle'}
                showIntersteialAdd={showIntersteialAdd}
              />

              <CategoryItem
                title={'Soup'}
                image={
                  'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/06/vegetable-soup.jpg'
                }
                props={props}
                category={'soup'}
                showIntersteialAdd={showIntersteialAdd}
              />
            </View>
          </View>

          <View style={[HomeScreenStyle.listMainCtn, {marginBottom: 0}]}>
            <Text style={HomeScreenStyle.categorytext}>Top Recipies</Text>
          </View>

          <View>
            <ScrollView horizontal={true} style={{width: '100%'}}>
              <View style={[HomeScreenStyle.listMainCtn, {marginTop: 0}]}>
                <FlatList
                  data={currentlist}
                  // numColumns={2}
                  renderItem={({item}) => {
                    return (
                      <DishCategory
                        props={props.props}
                        info={item}
                        showIntersteialAdd={showIntersteialAdd}
                      />
                    );
                  }}
                  keyExtractor={dataArray => dataArray.id.toString()}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
