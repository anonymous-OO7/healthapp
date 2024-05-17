import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import OnboardingStyle from './OnboardingStyle';

import LoginImg from '../../assets/images/LoginImg.svg';
import LogoViewer from '../../components/common/LogoViewer';
import {
  AppleSvg,
  GoogleSvg,
  LoginImage,
  LogoImage,
} from '../../assets/svgs/SvgImages';
import Button from '../../components/common/Button';
import ButtonIcon from '../../components/common/ButtonIcon';
import InputBox from '../../components/common/InputBox';

const OnboardingScreen = (props,{navigation}) => {

  
  const [email, setEmail] = useState("");



  const emailTextHandler =  (text) =>{

    console.log("EMAIL TEXT HANDLER" +text);

    setEmail(text);
      
  }


  return (
    <SafeAreaView style={OnboardingStyle.container}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>





        <LogoViewer
          Logosource={LogoImage}
          containerstyle={OnboardingStyle.logoImgContainer}
          logostyle={OnboardingStyle.logoImg}
        />
        <LogoViewer
          Logosource={LoginImage}
          containerstyle={OnboardingStyle.loginImgContainer}
          logostyle={OnboardingStyle.loginImg}
        />




        <Text style={OnboardingStyle.loginText}>Log in</Text>
 




        <InputBox inputplaceholder={"Enter email ID"} onChangeText={emailTextHandler}/>



        <Button  btntext="Send OTP" disabled={email != "" ? false : true} onclick={() => { props.navigation.navigate('AccountSetup')}}  buttonctn={OnboardingStyle.buttonCtn} />





        <View style={OnboardingStyle.buttonCtn}>
          <ButtonIcon disabled={false} Logosource={AppleSvg} />
        </View>

        <View style={[OnboardingStyle.buttonCtn, {marginTop: 0}]}>
          <ButtonIcon  disabled={false} Logosource={GoogleSvg} />
        </View>



      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
