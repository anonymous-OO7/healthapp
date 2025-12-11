import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../setup/app-context-manager/Authcontext';
import { useTheme } from '../themes';

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return userToken !== null ? <AppStack /> : <AuthStack />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNav;
