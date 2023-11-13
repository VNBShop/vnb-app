import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import ForumTabNavigation from './forum-tab';

const Stack = createNativeStackNavigator();
export default function ForumStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ForumTab" component={ForumTabNavigation} />
    </Stack.Navigator>
  );
}
