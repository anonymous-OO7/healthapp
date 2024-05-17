import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CategoryItem from '../../components/molecules/CategoryItem';
import {Colors} from '../../assets/colors';
import YoutubePlayer from 'react-native-youtube-iframe';
import LogoViewer from '../../components/common/LogoViewer';
import {StarRating} from '../../assets/svgs/SvgImages';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const DetailsPage = props => {
  console.log(props, 'PROPS IN DETAILS LAGE');

  const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2888315269414105/9673067192';
  
  const [recipie, setRecipie] = useState(props?.route?.params?.info);
  const [videoList, setVideoList] = useState(props?.route?.params?.list);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  useEffect(() => {
    console.log(recipie);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
        <ScrollView nestedScrollEnabled={true} style={{width: '100%'}}>
   
      <Image
        source={{uri: recipie?.image}}
        style={{width: responsiveWidth(100), height: responsiveWidth(55)}}
        resizeMode="cover"
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={styles.headingText}>{recipie?.display}</Text>
        <View style={{display: 'flex', flexDirection: 'row',alignItems:"center"}}>
        <LogoViewer
          Logosource={StarRating}
          containerstyle={styles.loginImgContainer}
          logostyle={styles.loginImg}
        />
        <Text style={styles.ratingText}>{recipie?.rating}</Text>
      </View>
      </View>
    

      <View style={styles.ingCtn}>
        <Text
          style={[
            styles.ingText,
            {fontSize: responsiveFontSize(1.9), fontFamily: 'Poppins-Light'},
          ]}>
          Basic Ingredients Required
        </Text>
        <FlatList
          data={recipie?.ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Text style={styles.ingText}>{item}</Text>
          )}
        />
        <Text
          style={[
            styles.ingText,
            {fontSize: responsiveFontSize(1.9), fontFamily: 'Poppins-Light'},
          ]}>
          Steps Required
        </Text>

        <FlatList
          data={recipie?.steps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Text style={styles.ingText}>
              {index + 1}: {item}
            </Text>
          )}
        />
      </View>

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
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  headingText: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(6),
    zIndex: 2, // Higher zIndex to ensure this view is on top
    fontSize: responsiveFontSize(3),
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  ingText: {
    width: responsiveWidth(95),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(6),
    zIndex: 2, // Higher zIndex to ensure this view is on top
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },

  profileButton: {
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: responsiveHeight(10),
    width: responsiveWidth(12),
    borderRadius: responsiveHeight(1),
    marginTop: responsiveHeight(2),
  },
  image: {
    flex: 1,
    transform: [{scale: 1.2}],
  },

  categoryStyle: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Rubik-Medium',
    color: 'black',
    marginTop: responsiveHeight(1),
  },
  topImageCtn: {
    backgroundColor: 'white',
  },
  ingCtn: {
    backgroundColor: 'white',
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

export default DetailsPage;
