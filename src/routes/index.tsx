import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {Host} from 'react-native-portalize';
import StackNavigation from './stack';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Host>
        <StackNavigation />
      </Host>
    </NavigationContainer>
  );
}
