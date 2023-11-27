/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {common} from './src/UIkit/styles';
import {AuthContext} from './src/components/auth-provider';
import Navigation from './src/routes';

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <GestureHandlerRootView style={common.flex_full}>
      <SafeAreaProvider>
        <AuthContext.Provider value={{auth, setAuth}}>
          <StatusBar
            translucent={true}
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />
          <Navigation />
        </AuthContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
