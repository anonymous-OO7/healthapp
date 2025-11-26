import React from 'react';

import i18n from './src/i18n';

import { AuthProvider } from './src/setup/app-context-manager/Authcontext';
import AppNav from './src/navigation/AppNav';
import { I18nextProvider } from 'react-i18next';
import { CartProvider } from './src/context/CartContext';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <AuthProvider>
          <AppNav />
        </AuthProvider>
      </CartProvider>
    </I18nextProvider>
  );
};

export default App;
