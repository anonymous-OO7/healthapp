import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const UpdateModal = ({ visible, onUpdate, onLater, isForceUpdate = false }) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, slideAnim, visible]);

  const features = [
    { icon: 'zap', text: 'Performance improvements' },
    { icon: 'shield', text: 'Security enhancements' },
    { icon: 'star', text: 'New features added' },
    { icon: 'tool', text: 'Bug fixes' },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
      onRequestClose={isForceUpdate ? undefined : onLater}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.handleBar} />

          <View style={styles.iconContainer}>
            <View style={styles.iconCircleOuter}>
              <View style={styles.iconCircleInner}>
                <Feather
                  name="download-cloud"
                  size={responsiveFontSize(4)}
                  color="#FFFFFF"
                />
              </View>
            </View>
          </View>

          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.subtitle}>
            A new version of the app is available with improvements and new
            features.
          </Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Feather
                    name={feature.icon}
                    size={responsiveFontSize(1.6)}
                    color="#3b82f6"
                  />
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={onUpdate}
            activeOpacity={0.8}
          >
            <Feather
              name="download"
              size={responsiveFontSize(2)}
              color="#FFFFFF"
            />
            <Text style={styles.updateButtonText}>Update Now</Text>
          </TouchableOpacity>

          {!isForceUpdate && (
            <TouchableOpacity
              style={styles.laterButton}
              onPress={onLater}
              activeOpacity={0.7}
            >
              <Text style={styles.laterButtonText}>Maybe Later</Text>
            </TouchableOpacity>
          )}

          {isForceUpdate && (
            <View style={styles.forceUpdateBadge}>
              <Feather
                name="alert-circle"
                size={responsiveFontSize(1.5)}
                color="#E53935"
              />
              <Text style={styles.forceUpdateText}>
                This update is required to continue
              </Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: responsiveWidth(7),
    borderTopRightRadius: responsiveWidth(7),
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(5),
    alignItems: 'center',
  },
  handleBar: {
    width: responsiveWidth(12),
    height: responsiveHeight(0.5),
    backgroundColor: '#E0E0E0',
    borderRadius: responsiveHeight(0.25),
    marginBottom: responsiveHeight(3),
  },
  iconContainer: {
    marginBottom: responsiveHeight(2.5),
  },
  iconCircleOuter: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: responsiveWidth(12),
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleInner: {
    width: responsiveWidth(17),
    height: responsiveWidth(17),
    borderRadius: responsiveWidth(8.5),
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.5),
    color: '#8E8E93',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4),
    lineHeight: responsiveHeight(2.8),
  },
  featuresContainer: {
    width: '100%',
    marginBottom: responsiveHeight(3),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  featureIconBox: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(4.5),
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3),
  },
  featureText: {
    fontSize: responsiveFontSize(1.6),
    color: '#4B5563',
    fontFamily: 'Poppins-Regular',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
    width: '100%',
    marginBottom: responsiveHeight(1.5),
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    gap: responsiveWidth(2),
  },
  updateButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  laterButton: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(8),
  },
  laterButtonText: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    fontFamily: 'Poppins-Medium',
  },
  forceUpdateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(1),
    gap: responsiveWidth(2),
  },
  forceUpdateText: {
    fontSize: responsiveFontSize(1.3),
    color: '#E53935',
    fontFamily: 'Poppins-Medium',
  },
});

export default UpdateModal;
