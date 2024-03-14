import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Chat} from '../../types/messenger';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import useAuth from '../_store/useAuth';
import {markConsecutiveDuplicates} from '../libs/utils';
import Avatar from './ui/avatar';

export default function ChatApp({chats}: {chats: Chat[]}) {
  const data = markConsecutiveDuplicates(chats);

  const {data: user} = useAuth();

  return (
    <>
      {data.map((item, index: number) => {
        return item.senderId === user?.userId && !!item?.content ? (
          item?.content ? (
            <View key={index} style={styles.container}>
              <View
                style={[
                  styles.sender,
                  item.position === 'first' ? styles.senderChatFirst : null,
                  item.position === 'middle' ? styles.senderChatMiddle : null,
                  item.position === 'last' ? styles.senderChatLast : null,
                  !item.position ? styles.my3 : null,
                ]}>
                <Text style={common.text_white}>{item.content}</Text>
              </View>
            </View>
          ) : null
        ) : item?.content ? (
          <View key={index} style={styles.containerReceiver}>
            {(item?.position && item?.position === 'last') ||
            !item?.position ? (
              <Avatar
                size={32}
                source="https://res.cloudinary.com/drpksxymr/image/upload/v1695303196/berreck_i387ac.jpg"
                username="D"
                style={spec.mrBase}
              />
            ) : (
              <View style={styles.box} />
            )}

            <View
              style={[
                styles.receiver,
                item.position === 'first' ? styles.receiverChatFirst : null,
                item.position === 'middle' ? styles.receiverChatMiddle : null,
                item.position === 'last' ? styles.receiverChatLast : null,
                !item.position ? styles.my3 : null,
              ]}>
              <Text>{item.content}</Text>
            </View>
          </View>
        ) : null;
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  sender: {
    alignSelf: 'flex-end',
    maxWidth: '70%',
    borderRadius: 18,
    backgroundColor: color.primary,
    padding: 12,
    paddingVertical: 8,
  },
  senderChatFirst: {
    marginTop: 12,
    borderBottomRightRadius: 4,
  },
  senderChatMiddle: {
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  senderChatLast: {
    borderTopRightRadius: 4,
  },
  box: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  containerReceiver: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  receiver: {
    alignSelf: 'flex-end',
    maxWidth: '70%',
    borderRadius: 18,
    backgroundColor: color.divider,
    padding: 12,
    paddingVertical: 8,
  },
  receiverChatFirst: {
    marginTop: 12,
    borderBottomLeftRadius: 4,
  },
  receiverChatMiddle: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  receiverChatLast: {
    borderTopLeftRadius: 4,
  },
  my3: {
    marginTop: 12,
  },
});
