import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Forum from '../screens/forum';
import Messenger from '../screens/messenger';

const Tab = createBottomTabNavigator();

export default function ForumTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="Messenger" component={Messenger} />
    </Tab.Navigator>
  );
}
