/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SocketProps} from '../../types/forum';
import {Chat, ChatCommunicate} from '../../types/messenger';
import {RootStackProps} from '../../types/route';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex} from '../UIkit/styles';
import useAuth from '../_store/useAuth';
import {back, messenger} from '../assets';
import ChatApp from '../components/chat';
import ChatSkeleton from '../components/skeleton/chat-skeleton';
import Avatar from '../components/ui/avatar';
import {Icon} from '../components/ui/icon';
import {useSocketContext} from '../context/socket';
import useFetchChat from '../hooks/messenger/useFetchChat';
import useFetchUserAcc from '../hooks/user/useFetchUserAcc';

type IProps = NativeStackScreenProps<RootStackProps, 'ConversationDetail'>;
export default function ConversationDetailScreen({navigation, route}: IProps) {
  const userId = route.params?.userId;

  const {data: user} = useAuth();

  const {chats, setChats, isError, isPending} = useFetchChat({
    chatId: userId,
  });

  const {
    loading,
    userAccount,
    isError: isErrorFetchUser,
  } = useFetchUserAcc({
    userId,
  });

  const socket = useSocketContext();

  React.useEffect(() => {
    const handleMessageRead = (message: SocketProps<Chat>) => {
      if (message?.type === 'CHAT') {
        setChats(prevChats => [...prevChats, message?.data]);
      }
    };

    socket?.on('receive_message', handleMessageRead);

    return () => {
      socket?.off('receive_message', handleMessageRead);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const form = useForm<{chat: string}>({
    defaultValues: {
      chat: '',
    },
  });

  const scrollViewRef = React.useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const onLayout = () => {
    scrollToBottom();
  };

  const onContentSizeChange = () => {
    scrollToBottom();
  };

  const onSubmit = ({chat}: {chat: string}) => {
    if (!chat || !user?.userId || !userId) {
      return;
    }
    const payload: ChatCommunicate = {
      content: chat,
      receiverId: userId as number,
      senderId: user?.userId,
      isImage: false,
    };

    setChats(prev => [
      ...prev,
      {
        content: chat,
        isImage: false,
        recipientId: userId as number,
        senderId: user?.userId,
      },
    ]);

    socket?.emit('send_message', payload);

    form.setValue('chat', '');
  };

  return (
    <KeyboardShift>
      <SafeArea>
        <View style={styles.header}>
          <View style={flex.flex_row}>
            <Icon icon={back} size={25} onPress={() => navigation.goBack()} />

            {loading ? (
              <>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 9999,
                    }}
                  />
                </SkeletonPlaceholder>

                <View style={{gap: 4}}>
                  <SkeletonPlaceholder>
                    <View
                      style={{width: 140, height: 16, borderRadius: 9999}}
                    />
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View style={{width: 60, height: 16, borderRadius: 9999}} />
                  </SkeletonPlaceholder>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserProfile', {
                      userId,
                    })
                  }>
                  <Avatar
                    source={userAccount?.avatar ?? ''}
                    username={
                      userAccount?.firstName ??
                      userAccount?.lastName ??
                      userAccount?.email ??
                      'Z'
                    }
                    size={40}
                    isActive
                  />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfile', {
                        userId,
                      })
                    }>
                    <Text style={styles.name}>
                      {userAccount?.firstName || userAccount?.lastName
                        ? `${userAccount?.firstName} ${userAccount?.lastName}`
                        : userAccount?.email}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.active}>Active now</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.messContainer}>
          {!!chats?.length && !isError && (
            <ScrollView
              contentContainerStyle={styles.chats}
              ref={scrollViewRef}
              onLayout={onLayout}
              onContentSizeChange={onContentSizeChange}>
              <>
                {!isPending && (
                  <View style={styles.emptyContainer}>
                    <View>
                      <Avatar
                        source={userAccount?.avatar ?? ''}
                        username={
                          userAccount?.firstName ??
                          userAccount?.lastName ??
                          userAccount?.email ??
                          'Z'
                        }
                        size={60}
                      />
                    </View>

                    <Text style={[common.text_base]}>
                      {userAccount?.firstName || userAccount?.lastName
                        ? `${userAccount?.firstName} ${userAccount?.lastName}`
                        : userAccount?.email}
                    </Text>

                    <Text style={common.text_gray}>
                      Let&apos; start conversation!
                    </Text>
                  </View>
                )}
                <ChatApp chats={chats} />
              </>
            </ScrollView>
          )}
          {!isError && isPending && <ChatSkeleton />}
        </View>

        <View
          style={[
            styles.footer,
            {
              display: isErrorFetchUser || loading ? 'none' : 'flex',
            },
          ]}>
          <Controller
            control={form.control}
            name="chat"
            render={({field: {value, onChange}}) => (
              <TextInput
                style={styles.textInput}
                placeholder="Aa"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Icon
            size={26}
            icon={messenger}
            onPress={() => form.handleSubmit(onSubmit)()}
          />
        </View>
      </SafeArea>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 100,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  active: {
    fontSize: 12,
    marginTop: 2,
    color: color.gray,
  },
  messContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  footer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: color.divider,
    paddingHorizontal: 16,
    borderRadius: 9999,
    paddingVertical: 8,
    fontSize: 16,
  },
  chats: {
    rowGap: 2,
  },
});
