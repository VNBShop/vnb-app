import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import OrderedScreen from '../screens/ordered';
import ForumStackNavigation from './forum-stack';

const Drawer = createDrawerNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Root" component={OrderedScreen} />
        <Drawer.Screen name="ForumDrawer" component={ForumStackNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
