import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import {tabOption} from './tab-options';
import CartScreen from '../screens/cart';
import ForumScreen from '../screens/forum';
import NotificationScreen from '../screens/notification';
import PersonalScreen from '../screens/personal';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen options={tabOption.home} name="Home" component={HomeScreen} />
      <Tab.Screen options={tabOption.cart} name="Cart" component={CartScreen} />
      <Tab.Screen
        options={tabOption.forum}
        name="Forum"
        component={ForumScreen}
      />
      <Tab.Screen
        options={tabOption.notify}
        name="Notification"
        component={NotificationScreen}
      />
      <Tab.Screen
        options={tabOption.personal}
        name="Personal"
        component={PersonalScreen}
      />
    </Tab.Navigator>
  );
}
