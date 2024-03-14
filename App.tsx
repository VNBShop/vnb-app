/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {common} from './src/UIkit/styles';
import RQProvider from './src/components/provider';
import LoadingScreen from './src/components/ui/loading-screen';
import Navigation from './src/routes';
import 'react-native-get-random-values';

function App() {
  return (
    <GestureHandlerRootView style={common.flex_full}>
      <SafeAreaProvider>
        <RQProvider>
          <StatusBar
            translucent={true}
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />
          <Navigation />
          <LoadingScreen />
          <Toast />
        </RQProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
