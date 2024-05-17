import React,{useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import AccountSetupStyle from './AccountSetupStyle';
import HeadingDesc from '../../components/molecules/HeadingDesc';
import HeadingBox from '../../components/molecules/HeadingBox';
import Button from '../../components/common/Button';
import AsyncStorage from "@react-native-async-storage/async-storage";


const AccountSetup = props => {



  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");


  const onPhoneChange = (text) => {
    console.log("phone change! in account setup " + text)
    setPhone(text)
  }



  const onNameChange = (text) => {
    console.log("name change! in account setup " + text)
    setName(text)
  }

  const onDone = () => {

  
    console.log("Done and token saved " )

    props.navigation.navigate('DashBoard')

    AsyncStorage.setItem('userToken' , "dfsgvs");



  }

  return (
    <SafeAreaView style={AccountSetupStyle.container}>


      <View style={AccountSetupStyle.view1}>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>



          <HeadingDesc
            props={props}
            containerstyle={AccountSetupStyle.headingCtn}
            mainCtn={AccountSetupStyle.headingCtn}
          />



          <HeadingBox
            props={props}
            headingText={'Phone no.'}
            inputplaceholder={'Enter phone number'}
            onInputChange={onPhoneChange}
          />

          <HeadingBox
            props={props}
            headingText={'Name'}
            inputplaceholder={'Enter name'}
            onInputChange={onNameChange}
          />

          <HeadingBox
            props={props}
            headingText={'Agency Name'}
            inputplaceholder={'Enter Agency Name '}
            onInputChange={onNameChange}
          />




        </ScrollView>
      </View>

      <View style={AccountSetupStyle.view2}>
        <Button onclick={onDone} disabled={ (name != "" && phone != "")  ? false : true} btntext="Done" buttonctn={AccountSetupStyle.buttonCtn} />
      </View>


    </SafeAreaView>
  );
};

export default AccountSetup;
