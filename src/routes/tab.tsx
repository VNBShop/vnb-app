/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {BottomTabProps} from '../../types/route';
import {color} from '../UIkit/palette';
import {bell, bellGray} from '../assets';
import {Icon} from '../components/ui/icon';
import {useNotifyContext} from '../context/notify';
import ForumScreen from '../screens/forum';
import HomeScreen from '../screens/home';
import NotificationScreen from '../screens/notification';
import PersonalScreen from '../screens/personal';
import ProductScreen from '../screens/products';
import {tabOption} from './tab-options';
import {Notification, SocketProps} from '../../types/forum';
import {useSocketContext} from '../context/socket';

const Tab = createBottomTabNavigator<BottomTabProps>();

export default function TabNavigation() {
  const screenName = useNavigationState(
    state => state.routes[state.index].state?.index,
  );

  const socket = useSocketContext();

  const noti = useNotifyContext();

  React.useEffect(() => {
    const onReceiveNoti = (notify: SocketProps<Notification>) => {
      if (notify?.type === 'NOTIFICATION') {
        noti?.setNotifys?.(prev => [notify?.data, ...prev]);
      }
    };

    socket?.on('receive_notification', onReceiveNoti);

    return () => {
      socket?.off('receive_notification', onReceiveNoti);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen options={tabOption.home} name="Home" component={HomeScreen} />
      <Tab.Screen
        options={tabOption.cart}
        name="Product"
        component={ProductScreen}
      />
      <Tab.Screen
        options={() => {
          if (!!screenName && screenName !== 0) {
            return tabOption.forumDefault;
          }
          return tabOption.forum;
        }}
        name="Forum"
        component={ForumScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <View style={{position: 'relative'}}>
                <Icon icon={bell} size={30} />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 16,
                    height: 16,
                    borderRadius: 9999,
                    backgroundColor: color.secondary,
                  }}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: color.white,
                    }}>
                    11
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{position: 'relative'}}>
                <Icon icon={bellGray} size={30} />
                {!!noti?.notifys.filter(n => !n?.isRead)?.length && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 16,
                      height: 16,
                      borderRadius: 9999,
                      backgroundColor: color.secondary,
                    }}>
                    <Text
                      style={{
                        fontSize: 9,
                        color: color.white,
                      }}>
                      {noti?.notifys.filter(n => !n?.isRead)?.length}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        }}
        name="Notification"
        component={NotificationScreen}
      />
      <Tab.Screen
        options={tabOption.personal}
        name="Personal"
        component={PersonalScreen}
      />
    </Tab.Navigator>
  );
}
