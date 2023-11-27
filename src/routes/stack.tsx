import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tab';
import OrderedScreen from '../screens/order';
import {RootStackProps} from '../types/route';
import CartScreen from '../screens/cart';
import CheckoutScreen from '../screens/checkout';
import ProductDetailScreen from '../screens/product-details';
import ProfileScreen from '../screens/profile';
import {useAuth} from '../components/auth-provider';
import LoginScreen from '../screens/login';
import LoginOptionScreen from '../screens/login-option';
import WellcomeScreen from '../screens/wellcome';
import SignupOptionScreen from '../screens/signup-option';
import SignupScreen from '../screens/signup';
import ForgotPasswordScreen from '../screens/forgot-password';
import ChangePasswordScreen from '../screens/change-password';
import IdentifyScreen from '../screens/identify';

const Stack = createNativeStackNavigator<RootStackProps>();
export default function StackNavigation() {
  const {auth} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {auth ? (
        <Stack.Screen name="Root" component={TabNavigation} />
      ) : (
        <Stack.Screen name="Wellcome" component={WellcomeScreen} />
      )}

      <Stack.Screen name="Ordered" component={OrderedScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginOption" component={LoginOptionScreen} />
      <Stack.Screen name="SignupOption" component={SignupOptionScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Identify" component={IdentifyScreen} />
    </Stack.Navigator>
  );
}
