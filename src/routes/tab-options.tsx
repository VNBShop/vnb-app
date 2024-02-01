import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {color} from '../UIkit/palette';
import {
  bell,
  bellGray,
  forumBlack,
  forumGray,
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
        <Icon icon={home} size={28} />
      ) : (
        <Icon icon={homeGray} size={28} />
      );
    },
  } as BottomTabNavigationOptions,
  cart: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={store} size={26} />
      ) : (
        <Icon icon={storeGray} size={26} />
      );
    },
  } as BottomTabNavigationOptions,
  forumDefault: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={forumBlack} size={28} />
      ) : (
        <Icon icon={forumGray} size={28} />
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
        <Icon icon={bell} size={30} />
      ) : (
        <Icon icon={bellGray} size={30} />
      );
    },
  } as BottomTabNavigationOptions,
  personal: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={user} size={28} />
      ) : (
        <Icon icon={userGray} size={28} />
      );
    },
  } as BottomTabNavigationOptions,
};

const styles = StyleSheet.create({
  forum: {
    top: Platform.OS === 'ios' ? -16 : -20,
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
    shadowColor: color.secondary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
