import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const PricingPage = () => {
  const navigation = useNavigation();

  const handleBuyNow = planType => {
    let purchaseURL = '';
    if (planType === 'monthly') {
      purchaseURL = 'YOUR_MONTHLY_PURCHASE_URL';
    } else if (planType === 'extended') {
      purchaseURL = 'YOUR_EXTENDED_PURCHASE_URL';
    }

    if (
      purchaseURL &&
      purchaseURL !== 'YOUR_MONTHLY_PURCHASE_URL' &&
      purchaseURL !== 'YOUR_EXTENDED_PURCHASE_URL'
    ) {
      Linking.openURL(purchaseURL);
    } else {
      alert(`Buy now link for ${planType} plan is not available.`);
    }
  };

  const CheckIcon = ({ filled = false }) => (
    <View style={[styles.checkIconContainer, filled && styles.checkIconFilled]}>
      <Feather
        name="check"
        size={responsiveFontSize(1.6)}
        color={filled ? '#FFFFFF' : '#3b82f6'}
      />
    </View>
  );

  const renderFeatureItem = (text, filled = false) => (
    <View style={styles.featureItem}>
      <CheckIcon filled={filled} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="arrow-left"
            size={responsiveFontSize(2.5)}
            color="#1A1A1A"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pricing</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.heading}>Grab your limited period offer!</Text>
          <Text style={styles.subHeading}>
            Choose the plan that works best for you
          </Text>

          <View style={styles.pricingContainer}>
            <View style={[styles.pricingCard, styles.standardCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Monthly</Text>
              </View>
              <Text style={styles.cardDescription}>
                Great for starters or occasional prospecting
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>₹149</Text>
                <Text style={styles.currentPrice}>₹99</Text>
                <Text style={styles.pricePeriod}>/month</Text>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => handleBuyNow('monthly')}
                activeOpacity={0.7}
              >
                <Text style={styles.buyButtonTextStandard}>Buy now</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <View style={styles.featuresList}>
                {renderFeatureItem('1 Month Plan', true)}
                {renderFeatureItem('All features')}
                {renderFeatureItem(
                  'Premium Referrals activated for limited period',
                )}
              </View>
            </View>

            <View style={[styles.pricingCard, styles.extendedCard]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, styles.extendedCardTitle]}>
                  Extended
                </Text>
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most popular</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Great for Serious hunters
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>₹449</Text>
                <Text style={[styles.currentPrice, styles.extendedPrice]}>
                  ₹249
                </Text>
                <Text style={styles.pricePeriod}>/3 months</Text>
              </View>
              <TouchableOpacity
                style={styles.extendedBuyButton}
                onPress={() => handleBuyNow('extended')}
                activeOpacity={0.7}
              >
                <Text style={styles.buyButtonTextExtended}>Buy now</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <View style={styles.featuresList}>
                {renderFeatureItem('3 Months Plan', true)}
                {renderFeatureItem('All features', true)}
                {renderFeatureItem('Premium Referrals Unlocked', true)}
              </View>
            </View>
          </View>

          <View style={styles.guaranteeContainer}>
            <Feather
              name="shield"
              size={responsiveFontSize(2)}
              color="#4CAF50"
            />
            <Text style={styles.guaranteeText}>
              30-day money-back guarantee
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins-SemiBold',
  },
  headerPlaceholder: {
    width: responsiveWidth(10),
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: responsiveHeight(5),
  },
  section: {
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4),
    alignItems: 'center',
  },
  heading: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: responsiveHeight(1),
  },
  subHeading: {
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
    color: '#8E8E93',
    fontFamily: 'Poppins-Regular',
    marginBottom: responsiveHeight(3),
  },
  pricingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  pricingCard: {
    width: '100%',
    maxWidth: responsiveWidth(92),
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveWidth(5),
    padding: responsiveWidth(6),
    marginBottom: responsiveHeight(2.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  standardCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  extendedCard: {
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
  },
  cardTitle: {
    color: '#1A1A1A',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
  extendedCardTitle: {
    color: '#3b82f6',
  },
  popularBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
  },
  popularBadgeText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
    color: '#3b82f6',
    fontFamily: 'Poppins-Medium',
  },
  cardDescription: {
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveHeight(2.8),
    color: '#8E8E93',
    fontFamily: 'Poppins-Regular',
    marginBottom: responsiveHeight(2),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: responsiveHeight(2.5),
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    fontSize: responsiveFontSize(2),
    color: '#BDBDBD',
    marginRight: responsiveWidth(2),
    fontFamily: 'Poppins-Regular',
  },
  currentPrice: {
    fontSize: responsiveFontSize(4),
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Poppins-Bold',
  },
  extendedPrice: {
    color: '#3b82f6',
  },
  pricePeriod: {
    fontSize: responsiveFontSize(1.5),
    color: '#8E8E93',
    marginLeft: responsiveWidth(1),
    fontFamily: 'Poppins-Regular',
  },
  buyButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#3b82f6',
    borderWidth: 2,
    borderRadius: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendedBuyButton: {
    backgroundColor: '#3b82f6',
    borderRadius: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buyButtonTextStandard: {
    color: '#3b82f6',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  buyButtonTextExtended: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: responsiveHeight(2.5),
  },
  featuresList: {
    gap: responsiveHeight(1.5),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkIconContainer: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    borderRadius: responsiveWidth(2.75),
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3),
    marginTop: responsiveHeight(0.2),
  },
  checkIconFilled: {
    backgroundColor: '#3b82f6',
  },
  featureText: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    color: '#4B5563',
    fontFamily: 'Poppins-Regular',
    lineHeight: responsiveHeight(2.8),
  },
  guaranteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: responsiveWidth(3),
  },
  guaranteeText: {
    fontSize: responsiveFontSize(1.5),
    color: '#4CAF50',
    fontFamily: 'Poppins-Medium',
    marginLeft: responsiveWidth(2),
  },
});

export default PricingPage;
