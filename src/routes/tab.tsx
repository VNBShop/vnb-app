/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';
import {BottomTabProps} from '../../types/route';
import ForumScreen from '../screens/forum';
import HomeScreen from '../screens/home';
import NotificationScreen from '../screens/notification';
import PersonalScreen from '../screens/personal';
import ProductScreen from '../screens/products';
import NotiBar from './notibar';
import {tabOption} from './tab-options';

const Tab = createBottomTabNavigator<BottomTabProps>();

export default function TabNavigation() {
  const screenName = useNavigationState(
    state => state.routes[state.index].state?.index,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen options={tabOption.home} name="Home" component={HomeScreen} />
      <Tab.Screen
        options={tabOption.cart}
        name="Product"
        component={ProductScreen}
      />
      <Tab.Screen
        options={() => {
          if (!!screenName && screenName !== 0) {
            return tabOption.forumDefault;
          }
          return tabOption.forum;
        }}
        name="Forum"
        component={ForumScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return <NotiBar focused={focused} />;
          },
        }}
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
