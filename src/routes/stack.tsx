import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import CartScreen from '../screens/cart';
import ChangePasswordScreen from '../screens/change-password';
import CheckoutScreen from '../screens/checkout';
import ConversationDetailScreen from '../screens/conversation-details';
import ConversationListScreen from '../screens/conversation-list';
import ForgotPasswordScreen from '../screens/forgot-password';
import IdentifyScreen from '../screens/identify';
import LoginScreen from '../screens/login';
import LoginOptionScreen from '../screens/login-option';
import OrderedScreen from '../screens/order';
import ProductDetailScreen from '../screens/product-details';
import ProfileScreen from '../screens/profile';
import SearchScreen from '../screens/search';
import SignupScreen from '../screens/signup';
import SignupOptionScreen from '../screens/signup-option';
import WellcomeScreen from '../screens/wellcome';
import {RootStackProps} from '../types/route';
import TabNavigation from './tab';

const Stack = createNativeStackNavigator<RootStackProps>();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={TabNavigation} />
      <Stack.Screen name="Wellcome" component={WellcomeScreen} />
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
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="ConversationList"
        component={ConversationListScreen}
      />
      <Stack.Screen
        name="ConversationDetail"
        component={ConversationDetailScreen}
      />
    </Stack.Navigator>
  );
}
