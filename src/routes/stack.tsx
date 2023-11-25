import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tab';
import OrderedScreen from '../screens/order';
import {RootStackProps} from '../types/route';
import CartScreen from '../screens/cart';
import CheckoutScreen from '../screens/checkout';
import ProductDetailScreen from '../screens/product-details';
import ProfileScreen from '../screens/profile';

const Stack = createNativeStackNavigator<RootStackProps>();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={TabNavigation} />
      <Stack.Screen name="Ordered" component={OrderedScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
