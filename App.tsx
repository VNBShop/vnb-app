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
import {common} from './src/UIkit/styles';
import Navigation from './src/routes';
import RQProvider from './src/components/provider';

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
        </RQProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
