import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '../../../setup/app-context-manager/Authcontext';
import LogoViewer from '../common/LogoViewer';
import { windowWidth } from '../../../utils/Dimensions';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Logout, Share } from '../../../assets/images/SvgImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../assets/colors';

const APP_NAME = 'Eat Fit';
const DEFAULT_INITIALS = 'EF';

const CustomDrawer = props => {
  const { logout } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      if (jsonValue != null) {
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  function getFirstAndLastCharacters(name) {
    try {
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return DEFAULT_INITIALS;
      }
      const trimmedName = name.trim();
      const words = trimmedName.split(' ').filter(word => word.length > 0);
      if (words.length === 0) {
        return DEFAULT_INITIALS;
      }
      if (words.length === 1) {
        return words[0][0].toUpperCase();
      }
      const firstChar = words[0][0].toUpperCase();
      const lastChar = words[words.length - 1][0].toUpperCase();
      return firstChar + lastChar;
    } catch (error) {
      return DEFAULT_INITIALS;
    }
  }

  const namelogo = getFirstAndLastCharacters(userInfo?.agency_name);
  const displayName = userInfo?.agency_name?.trim() || APP_NAME;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollViewContent}
      >
        <ImageBackground style={styles.headerBackground}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.profileText}>{namelogo}</Text>
            </View>
            <Text style={styles.nameText}>{displayName}</Text>

            {userInfo?.mobile ? (
              <Text style={styles.infoText}>{userInfo.mobile}</Text>
            ) : null}
            {userInfo?.email ? (
              <Text style={styles.infoTextLast}>{userInfo.email}</Text>
            ) : null}
          </View>
        </ImageBackground>
        <View style={styles.drawerListContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => {}} style={styles.bottomButton}>
          <View style={styles.bottomButtonContent}>
            <LogoViewer
              Logosource={Share}
              containerstyle={styles.logoImgContainer}
              logostyle={styles.logoImg}
            />
            <Text style={styles.bottomButtonText}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Onboarding' }],
            });
          }}
          style={styles.bottomButton}
        >
          <View style={styles.bottomButtonContent}>
            <LogoViewer
              Logosource={Logout}
              containerstyle={styles.logoImgContainer}
              logostyle={styles.logoImg}
            />
            <Text style={styles.bottomButtonText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollViewContent: {
    backgroundColor: Colors.white,
  },
  headerBackground: {
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4),
  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#007FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    borderRadius: responsiveHeight(5),
    marginBottom: responsiveHeight(1.5),
  },
  profileText: {
    fontSize: responsiveFontSize(3.4),
    fontFamily: 'Rubik-Regular',
    color: 'white',
  },
  nameText: {
    color: Colors.black,
    fontSize: responsiveFontSize(2.4),
    fontFamily: 'Poppins-Medium',
    marginBottom: responsiveHeight(0.5),
    textAlign: 'center',
  },
  infoText: {
    color: Colors.text,
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginTop: responsiveHeight(0.3),
  },
  infoTextLast: {
    color: Colors.text,
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginTop: responsiveHeight(0.3),
    marginBottom: responsiveHeight(0.5),
  },
  drawerListContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: responsiveHeight(1),
  },
  bottomSection: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  bottomButton: {
    paddingVertical: responsiveHeight(1.5),
  },
  bottomButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImgContainer: {
    backgroundColor: 'white',
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(4),
    width: responsiveWidth(8),
  },
  logoImg: {
    height: responsiveHeight(3),
    width: responsiveWidth(5),
  },
  bottomButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Poppins-Medium',
    marginLeft: responsiveWidth(3),
    color: Colors.black,
  },
});

export default CustomDrawer;
