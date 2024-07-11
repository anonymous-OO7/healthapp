import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SecondaryButton} from '../../components/common/AppButton/Button.js';
import {Colors} from '../../assets/colors.js';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import YoutubePlayer from 'react-native-youtube-iframe';
import LogoViewer from '../../components/common/LogoViewer.js';
import {BackSvg, HeartSvg} from '../../assets/images/SvgImages.js';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const DetailsScreen = ({navigation, route}) => {
  const item = route.params.food;

  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-2888315269414105/9673067192';

  const [videoList, setVideoList] = React.useState(route?.params?.list);
  const [playing, setPlaying] = React.useState(false);

  const onStateChange = React.useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = React.useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white}}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <LogoViewer
            Logosource={BackSvg}
            containerstyle={style.logoImgContainer}
            logostyle={style.logoImg}
          />
        </TouchableOpacity>
        <Text style={style.detailsText}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={{uri: item.image}} style={{height: 220, width: 220}} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(3),
                fontFamily: 'Poppins-Medium',
                color: Colors.white,
              }}>
              {item.display}
            </Text>
            <TouchableOpacity style={style.iconContainer}>
              <LogoViewer
                Logosource={HeartSvg}
                containerstyle={style.logoImgContainer}
                logostyle={style.logoImg}
              />
            </TouchableOpacity>
          </View>
          <Text style={style.detailsText}>{item?.desc}</Text>

          {videoList?.map((item, index) => {
            console.log('ITEM ', item);

            return (
              <YoutubePlayer
                key={index}
                height={300}
                play={playing}
                videoId={item}
                onChangeState={onStateChange}
              />
            );
          })}
          <View style={{marginBottom:responsiveHeight(10)}}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
          </View>
       
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1),
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: Colors.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },

  detailsText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Rubik-Regular',
    color: 'black',
    width: responsiveWidth(82),
    marginLeft: responsiveWidth(2),
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
  },
  logoImg: {
    height: responsiveHeight(8),
    width: responsiveWidth(6),
  },
});

export default DetailsScreen;
