import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './root-tab';

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
}
