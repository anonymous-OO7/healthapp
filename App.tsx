import React from 'react';
import { AuthProvider } from './src/setup/app-context-manager/Authcontext';
import AppNav from './src/navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
