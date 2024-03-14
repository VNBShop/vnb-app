/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ActivityIndicator,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackProps} from '../../types/route';
import {common} from '../UIkit/styles';
import Avatar from './ui/avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {color} from '../UIkit/palette';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useDeleteChat from '../hooks/messenger/useDeleteChat';

dayjs.extend(relativeTime);

export type ConversationListCardProps = {
  id: number;
  avatar: ImageProps | string;
  name: string;
  lastMessage: string;
  updateAt: Date;
};

export default function ConversationListCard({
  avatar,
  lastMessage,
  updateAt,
  name,
  id,
}: ConversationListCardProps) {
  const refAction = React.useRef<Modalize>();

  const insets = useSafeAreaInsets();
  const navigator =
    useNavigation<
      NativeStackNavigationProp<RootStackProps, 'ConversationList'>
    >();

  const onOpenAction = () => {
    !!refAction?.current && refAction.current?.open();
  };

  const onCloseAction = () => {
    !!refAction?.current && refAction.current?.close();
  };

  const {loading, onDeleteMessage} = useDeleteChat({
    onSuccess: onCloseAction,
  });

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onLongPress={onOpenAction}
        onPress={() =>
          navigator.navigate('ConversationDetail', {
            userId: id,
          })
        }>
        <Avatar source={avatar} username={name} size={55} isActive />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.footer}>
            <Text numberOfLines={1} style={[styles.primary]}>
              <Text>{name}:</Text> <Text>{lastMessage}</Text>
            </Text>
            <Text style={common.text_gray}>
              · {updateAt ? dayjs(updateAt)?.fromNow() : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={true}
          overlayStyle={{backgroundColor: 'rgba(255, 255, 255, 0)'}}
          modalStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
          }}
          adjustToContentHeight
          FooterComponent={
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <TouchableOpacity
                onPress={onCloseAction}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    color: color.danger,
                    fontSize: 17,
                    fontWeight: '500',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          }
          FloatingComponent={
            <View
              style={{
                height: insets.bottom,
              }}
            />
          }
          ref={refAction}>
          <View style={{marginHorizontal: 16, marginBottom: 8}}>
            <View style={{backgroundColor: '#ffffff', borderRadius: 8}}>
              <TouchableOpacity
                disabled={loading}
                onPress={() =>
                  onDeleteMessage({
                    receiverId: id,
                  })
                }
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  flexDirection: 'row',
                  gap: 8,
                }}>
                {loading && <ActivityIndicator />}
                <Text style={{fontSize: 18, color: color.link}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  content: {flex: 1, gap: 4},
  name: {fontWeight: '500', fontSize: 16},
  primary: {
    flex: 1,
  },
  footer: {flexDirection: 'row', gap: 2},
});
