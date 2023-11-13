/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/routes';

function App() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
