import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WellcomeScreen from '../screens/wellcome';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={WellcomeScreen} />
    </Tab.Navigator>
  );
}
