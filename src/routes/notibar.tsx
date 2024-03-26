/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View} from 'react-native';
import {Notification, SocketProps} from '../../types/forum';
import {color} from '../UIkit/palette';
import {bell, bellGray} from '../assets';
import {Icon} from '../components/ui/icon';
import {useNotifyContext} from '../context/notify';
import {useSocketContext} from '../context/socket';

type IProps = {
  focused: boolean;
};

export default function NotiBar({focused}: IProps) {
  const socket = useSocketContext();

  const noti = useNotifyContext();

  React.useEffect(() => {
    console.log('notu count ');

    const onReceiveNoti = (notify: SocketProps<Notification>) => {
      console.log('notu >>>', notify);

      if (notify?.type === 'NOTIFICATION') {
        noti?.setNotifys?.(prev => [
          ...([notify?.data] ?? []),
          ...prev?.filter(
            i => i?.notificationId !== notify?.data?.notificationId,
          ),
        ]);
      }
    };

    socket?.on('receive_notification', onReceiveNoti);

    return () => {
      socket?.off('receive_notification', onReceiveNoti);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return focused ? (
    <View style={{position: 'relative'}}>
      <Icon icon={bell} size={30} />
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
            {noti?.notifys?.filter(n => !n?.isRead)?.length}
          </Text>
        </View>
      )}
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
            {noti?.notifys?.filter(n => !n?.isRead)?.length}
          </Text>
        </View>
      )}
    </View>
  );
}
