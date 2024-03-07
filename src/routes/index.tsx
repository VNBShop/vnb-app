import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
// import StackNavigation from './stack';
import {Host} from 'react-native-portalize';
import CheckoutScreen from '../screens/checkout';
import LoginScreen from '../screens/login';
import ChangePasswordScreen from '../screens/change-password';
import EditProfileScreen from '../screens/edit-profile';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Host>
        <EditProfileScreen />
      </Host>
    </NavigationContainer>
  );
}
