import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNavigation from './stack';
import {Host} from 'react-native-portalize';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Host>
        <StackNavigation />
      </Host>
    </NavigationContainer>
  );
}
