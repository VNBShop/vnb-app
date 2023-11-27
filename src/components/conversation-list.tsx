import * as React from 'react';
import {
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from './ui/avatar';
import {common} from '../UIkit/styles';
import {color} from '../UIkit/palette';

export type ConversationListCardProps = {
  id?: number;
  avatar: ImageProps | string;
  name: string;
  lastMessage: string;
  updateAt: string;
  isRead: boolean;
};

export default function ConversationListCard({
  avatar,
  lastMessage,
  updateAt,
  name,
  isRead,
}: ConversationListCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Avatar source={avatar} username={name} size={50} isActive />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.footer}>
          <Text
            numberOfLines={1}
            style={[
              styles.primary,
              {color: isRead ? color.gray : color.primary},
            ]}>
            <Text>{name}:</Text> <Text>{lastMessage}</Text>
          </Text>
          <Text style={common.text_gray}> · {updateAt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  content: {flex: 1, gap: 4},
  name: {fontWeight: '500', fontSize: 16},
  primary: {
    flex: 1,
  },
  footer: {flexDirection: 'row', gap: 2},
});
