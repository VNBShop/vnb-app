import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {color} from '../UIkit/palette';
import {
  bell,
  bellGray,
  home,
  homeGray,
  store,
  storeGray,
  user,
  userGray,
} from '../assets';
import {chatLottie} from '../lottie';
import {Icon} from '../components/ui/icon';

export const tabOption = {
  home: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={home} size={25} />
      ) : (
        <Icon icon={homeGray} size={25} />
      );
    },
  } as BottomTabNavigationOptions,
  cart: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={store} size={22} />
      ) : (
        <Icon icon={storeGray} size={22} />
      );
    },
  } as BottomTabNavigationOptions,
  forum: {
    tabBarIcon: ({focused}) => {
      return (
        <View style={styles.forum}>
          <LottieView
            source={chatLottie}
            autoPlay={!focused}
            loop
            style={styles.icon}
          />
        </View>
      );
    },
  } as BottomTabNavigationOptions,
  notify: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={bell} size={28} />
      ) : (
        <Icon icon={bellGray} size={28} />
      );
    },
  } as BottomTabNavigationOptions,
  personal: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={user} size={25} />
      ) : (
        <Icon icon={userGray} size={25} />
      );
    },
  } as BottomTabNavigationOptions,
};

const styles = StyleSheet.create({
  forum: {
    top: Platform.OS === 'ios' ? -12 : -20,
    borderColor: '#ff9fb5',
    borderWidth: 1,
    borderBottomColor: 'tranparent',
    borderBottomWidth: 0,
    backgroundColor: color.white,
    width: 60,
    height: 60,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
