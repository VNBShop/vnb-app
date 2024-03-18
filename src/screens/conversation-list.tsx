import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import {back, create} from '../assets';
import Empty from '../components/404';
import ConversationListCard from '../components/conversation-list';
import ModalSearchForum from '../components/modal-search-forum';
import ChatCardSkeleton from '../components/skeleton/chat-card-skeleton';
import {Icon} from '../components/ui/icon';
import useFetchChats from '../hooks/messenger/useFetchChats';
import {useSocketContext} from '../context/socket';
import {ChatCard} from '../../types/messenger';
import {SocketProps} from '../../types/forum';

type ConversationListScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ConversationList'
>;

export default function ConversationListScreen({
  navigation,
}: ConversationListScreenProps) {
  const {
    hasNextPage,
    refetch,
    isPending,
    messages,
    onFetchNextPage,
    setMessages,
  } = useFetchChats();

  const socket = useSocketContext();

  React.useEffect(() => {
    const handleMessageRead = (message: SocketProps<ChatCard>) => {
      console.log('message message', message);

      if (message?.type === 'CHAT_LIST') {
        setMessages(prevChats => {
          const findIndex = prevChats?.findIndex(
            i => i?.receiverId === message?.data?.receiverId,
          );

          if (findIndex !== -1) {
            const newMess = prevChats?.filter(
              i => i?.receiverId !== message?.data?.receiverId,
            );

            return [message?.data, ...newMess];
          }

          return [message?.data, ...prevChats];
        });
      }
    };

    socket?.on('update_list_message', handleMessageRead);

    return () => {
      socket?.off('update_list_message', handleMessageRead);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <SafeArea>
      <View style={styles.header}>
        <Icon size={25} icon={back} onPress={() => navigation.goBack()} />
        <Text style={common.headerTitle}>Conversations</Text>

        <ModalSearchForum>
          <Icon icon={create} size={25} />
        </ModalSearchForum>
      </View>

      <View style={[common.flex_full, spec.space_horizontal, spec.mt_xl]}>
        <View style={styles.conversationList}>
          <FlatList
            numColumns={1}
            renderItem={({item}) => (
              <ConversationListCard
                avatar={item?.receiverAvatar}
                lastMessage={item?.latestMessage}
                name={item?.receiverName}
                id={item?.receiverId}
                updateAt={item?.latestMessageAt}
              />
            )}
            data={messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.receiverId?.toLocaleString()}
            ListFooterComponent={
              <>
                {isPending ? <ChatCardSkeleton /> : <BottomSafeArea />}
                {!messages?.length && !isPending ? (
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Empty
                      message="You has no messages yet!"
                      showIcon={false}
                    />
                  </View>
                ) : null}
              </>
            }
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (hasNextPage) {
                onFetchNextPage();
              }
            }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refetch} />
            }
          />
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: color.divider,
    borderRadius: 9999,
    alignItems: 'center',
  },
  conversationList: {
    rowGap: 16,
    marginTop: 12,
    flex: 1,
  },
});
