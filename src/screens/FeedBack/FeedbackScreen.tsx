import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Keyboard,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import FeedbackScreenStyle from './FeedbackScreenStyle';
import useToast from '../../hooks/useToast';
import { FeedbackApi } from '../../apis';
import { Colors } from '../../assets/colors';

const FeedbackScreen = props => {
  const { showCustomToast } = useToast();
  const navigation = useNavigation();
  const theme = useTheme();

  const showToast = text => {
    if (text != undefined && text != null && text != '') {
      ToastAndroid.show(text, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Some error occurred!!', ToastAndroid.SHORT);
    }
  };

  const [loading, setLoading] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [feedbackData, setFeedbackData] = useState({
    subject: '',
    body: '',
  });

  const updateFeedbackData = (key, value) => {
    setFeedbackData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const submitFeedback = useCallback(async () => {
    setLoading(true);

    setTimeout(() => {
      setSuccessAdd(true);
      setLoading(false);
    }, 1500);
  }, [feedbackData]);

  const onSubjectChange = text => {
    updateFeedbackData('subject', text);
  };

  const onBodyChange = text => {
    updateFeedbackData('body', text);
  };

  const isFormValid =
    feedbackData.subject &&
    feedbackData.subject.trim() !== '' &&
    feedbackData.body &&
    feedbackData.body.trim() !== '';

  const renderHeader = () => (
    <View style={FeedbackScreenStyle.header}>
      <TouchableOpacity
        style={FeedbackScreenStyle.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather
          name="arrow-left"
          size={responsiveFontSize(2.5)}
          color="#1A1A1A"
        />
      </TouchableOpacity>
      <Text style={FeedbackScreenStyle.headerTitle}>Submit Feedback</Text>
      <View style={FeedbackScreenStyle.headerPlaceholder} />
    </View>
  );

  const renderForm = () => (
    <View style={FeedbackScreenStyle.formContainer}>
      <View style={FeedbackScreenStyle.illustrationContainer}>
        <View style={FeedbackScreenStyle.illustrationCircle}>
          <Feather
            name="message-square"
            size={responsiveFontSize(4)}
            color="#3b82f6"
          />
        </View>
      </View>

      <Text style={FeedbackScreenStyle.formTitle}>
        We'd love to hear from you!
      </Text>
      <Text style={FeedbackScreenStyle.formSubtitle}>
        Your feedback helps us improve our app and services
      </Text>

      <View style={FeedbackScreenStyle.inputGroup}>
        <Text style={FeedbackScreenStyle.inputLabel}>Title</Text>
        <View style={FeedbackScreenStyle.inputContainer}>
          <Feather
            name="edit-3"
            size={responsiveFontSize(2)}
            color="#8E8E93"
            style={FeedbackScreenStyle.inputIcon}
          />
          <TextInput
            style={FeedbackScreenStyle.textInput}
            placeholder="Enter feedback title"
            placeholderTextColor="#BDBDBD"
            value={feedbackData.subject}
            onChangeText={onSubjectChange}
          />
        </View>
      </View>

      <View style={FeedbackScreenStyle.inputGroup}>
        <Text style={FeedbackScreenStyle.inputLabel}>Description</Text>
        <View
          style={[
            FeedbackScreenStyle.inputContainer,
            FeedbackScreenStyle.textAreaContainer,
          ]}
        >
          <Feather
            name="file-text"
            size={responsiveFontSize(2)}
            color="#8E8E93"
            style={[
              FeedbackScreenStyle.inputIcon,
              { alignSelf: 'flex-start', marginTop: responsiveHeight(1.5) },
            ]}
          />
          <TextInput
            style={[
              FeedbackScreenStyle.textInput,
              FeedbackScreenStyle.textArea,
            ]}
            placeholder="Tell us more about your feedback..."
            placeholderTextColor="#BDBDBD"
            value={feedbackData.body}
            onChangeText={onBodyChange}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>
      </View>

      <View style={FeedbackScreenStyle.characterCount}>
        <Text style={FeedbackScreenStyle.characterCountText}>
          {feedbackData.body.length}/500 characters
        </Text>
      </View>
    </View>
  );

  const renderSuccess = () => (
    <View style={FeedbackScreenStyle.successContainer}>
      <View style={FeedbackScreenStyle.lottieContainer}>
        <LottieView
          style={FeedbackScreenStyle.animationCtn}
          source={require('../../assets/animations/SuccessAnimation.json')}
          autoPlay
          loop={false}
        />
      </View>

      <Text style={FeedbackScreenStyle.successTitle}>Thank You!</Text>
      <Text style={FeedbackScreenStyle.successSubtitle}>
        Your feedback has been submitted successfully
      </Text>
      <Text style={FeedbackScreenStyle.successMessage}>
        We appreciate you taking the time to share your thoughts with us. Our
        team will review your feedback shortly.
      </Text>
    </View>
  );

  const renderButton = () => (
    <View
      style={[
        FeedbackScreenStyle.buttonContainer,
        {
          marginBottom: keyboardVisible
            ? responsiveHeight(1)
            : responsiveHeight(3),
        },
      ]}
    >
      {successAdd ? (
        <TouchableOpacity
          style={FeedbackScreenStyle.submitButton}
          onPress={() => {
            setSuccessAdd(false);
            setFeedbackData({ subject: '', body: '' });
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="arrow-left"
            size={responsiveFontSize(2)}
            color="#FFFFFF"
          />
          <Text style={FeedbackScreenStyle.submitButtonText}>
            Submit Another
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            FeedbackScreenStyle.submitButton,
            !isFormValid && FeedbackScreenStyle.submitButtonDisabled,
          ]}
          onPress={submitFeedback}
          disabled={!isFormValid || loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <Text style={FeedbackScreenStyle.submitButtonText}>
              Submitting...
            </Text>
          ) : (
            <>
              <Text style={FeedbackScreenStyle.submitButtonText}>
                Submit Feedback
              </Text>
              <Feather
                name="send"
                size={responsiveFontSize(2)}
                color="#FFFFFF"
              />
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={FeedbackScreenStyle.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {renderHeader()}

      <KeyboardAwareScrollView
        style={FeedbackScreenStyle.scrollView}
        contentContainerStyle={FeedbackScreenStyle.scrollContent}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={responsiveHeight(10)}
      >
        {successAdd ? renderSuccess() : renderForm()}
      </KeyboardAwareScrollView>

      {renderButton()}
    </SafeAreaView>
  );
};

export default FeedbackScreen;
