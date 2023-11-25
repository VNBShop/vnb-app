import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNavigation from './stack';

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
