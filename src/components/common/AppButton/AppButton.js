import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import { Colors } from '../../../assets/colors';

const AppButton = props => {
  return <Button {...props} buttonStyle={styles.buttonStyle} />;
};

export default AppButton;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    borderRadius: 15,
    backgroundColor: Colors.orange,
  },
});
