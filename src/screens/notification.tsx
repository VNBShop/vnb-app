/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex} from '../UIkit/styles';
import {search_gray} from '../assets';
import ModalSearchForum from '../components/modal-search-forum';
import ChatCardSkeleton from '../components/skeleton/chat-card-skeleton';
import Avatar from '../components/ui/avatar';
import {IconOutline} from '../components/ui/icon';
import {useNotifyContext} from '../context/notify';
import {Notification, Post} from '../../types/forum';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackProps} from '../../types/route';

export default function NotificationScreen() {
  const noti = useNotifyContext();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();

  const onRead = ({
    id,
    postId,
  }: {
    id: Notification['notificationId'];
    postId: Post['postId'];
  }) => {
    if (!id || !postId) {
      return;
    }

    // socket?.emit('read_notification', id)

    noti?.setNotifys?.(prev => {
      const findIndex = prev.findIndex(i => i?.notificationId === id);

      if (findIndex !== -1) {
        const newNotifys = [...prev];

        newNotifys[findIndex] = {
          ...newNotifys[findIndex],
          isRead: true,
        };

        return newNotifys;
      }
      return prev;
    });

    navigation.navigate('PostDetail', {
      postId: postId,
    });
  };

  return (
    <SafeArea>
      <View style={styles.header}>
        <Text style={common.titleLeft}>Notification</Text>

        <View style={flex.flex_row}>
          <ModalSearchForum isProfile>
            <IconOutline icon={search_gray} size={36} />
          </ModalSearchForum>
        </View>
      </View>

      <FlatList
        data={noti?.notifys}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              onRead({
                id: item?.notificationId,
                postId: item?.postId,
              })
            }
            style={[styles.notifyItem, !item?.isRead && styles.notRead]}>
            <Avatar
              size={50}
              source={item?.actorAvatar ?? ''}
              username={item?.actorName ?? 'Z'}
            />

            <Text style={styles.notifyContent} numberOfLines={2}>
              <Text style={common.fontBase}>{item?.actorName}</Text>{' '}
              {item?.content}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item?.notificationId?.toString()}
        ListHeaderComponent={<Text style={styles.textTitle}>All</Text>}
        ListFooterComponent={
          <>
            {!noti?.isPending && !noti?.notifys?.length && (
              <Text
                style={{
                  alignItems: 'center',
                  color: color.gray,
                }}>
                You has no notifications yet!
              </Text>
            )}

            {noti?.isPending && <ChatCardSkeleton />}
          </>
        }
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (noti?.hasNextPage) {
            noti?.onFetchNextPage();
          }
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={noti?.refetch} />
        }
      />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  notifyContainer: {
    marginTop: 16,
  },
  notifyItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  notRead: {
    backgroundColor: color.divider,
  },
  notifyContent: {
    flex: 1,
    lineHeight: 22,
  },
});
