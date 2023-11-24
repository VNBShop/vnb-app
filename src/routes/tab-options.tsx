import * as React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Icon} from '../components/ui/icon';
import {
  bell,
  bellOutline,
  cartIcon,
  cartIconOutline,
  forum,
  home,
  homeOutline,
  user,
  userOutline,
} from '../assets';
import {Platform, StyleSheet, View} from 'react-native';
import {color} from '../UIkit/palette';

export const tabOption = {
  home: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={home} size={25} />
      ) : (
        <Icon icon={homeOutline} size={25} />
      );
    },
  } as BottomTabNavigationOptions,
  cart: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={cartIcon} size={25} />
      ) : (
        <Icon icon={cartIconOutline} size={25} />
      );
    },
  } as BottomTabNavigationOptions,
  forum: {
    tabBarIcon: () => {
      return (
        <View style={styles.forumWrapper}>
          <View style={styles.forum}>
            <Icon icon={forum} size={30} />
          </View>
        </View>
      );
    },
  } as BottomTabNavigationOptions,
  notify: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={bell} size={28} />
      ) : (
        <Icon icon={bellOutline} size={28} />
      );
    },
  } as BottomTabNavigationOptions,
  personal: {
    tabBarIcon: ({focused}) => {
      return focused ? (
        <Icon icon={user} size={25} />
      ) : (
        <Icon icon={userOutline} size={25} />
      );
    },
  } as BottomTabNavigationOptions,
};

const styles = StyleSheet.create({
  forumWrapper: {
    top: Platform.OS === 'ios' ? -20 : -20,
    borderColor: color.divider,
    borderWidth: 1,
    borderBottomColor: 'tranparent',
    borderBottomWidth: 0,
    backgroundColor: color.white,
    borderRadius: 199,
    padding: 8,
  },
  forum: {
    width: Platform.OS === 'ios' ? 50 : 60,
    height: Platform.OS === 'ios' ? 50 : 60,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
