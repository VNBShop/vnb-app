import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import {back, create, search_gray} from '../assets';
import {Icon} from '../components/ui/icon';
import ActiveUserList from '../components/active-user-list';
import ConversationListCard, {
  ConversationListCardProps,
} from '../components/conversation-list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../types/route';

type ConversationListScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ConversationList'
>;

export default function ConversationListScreen({
  navigation,
}: ConversationListScreenProps) {
  return (
    <SafeArea>
      <View style={styles.header}>
        <Icon size={25} icon={back} onPress={() => navigation.goBack()} />
        <Text style={common.headerTitle}>Conversations</Text>

        <Icon icon={create} size={25} />
      </View>

      <View style={[common.flex_full, spec.space_horizontal]}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.search}>
            <Icon size={20} icon={search_gray} />
            <Text style={[common.text_gray, common.text_base]}>Search</Text>
          </View>

          <View style={spec.marginVerticalBase}>
            <ActiveUserList />
          </View>

          <View style={styles.conversationList}>
            {fakeListUser.map(conversation => (
              <ConversationListCard
                key={conversation.id}
                name={conversation.name}
                avatar={conversation.avatar}
                lastMessage={conversation.lastMessage}
                updateAt={conversation.updateAt}
                isRead={conversation.isRead}
              />
            ))}
          </View>
        </ScrollView>
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
  },
});

const fakeListUser: ConversationListCardProps[] = [
  {
    id: 1,
    name: 'Dzung',
    updateAt: 'now',
    isRead: true,
    lastMessage:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1695303196/berreck_i387ac.jpg',
  },
  {
    id: 2,
    name: 'Hoe Hoe',
    updateAt: '1m',
    isRead: false,
    lastMessage:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1694877191/littlething_eyzztc.jpg',
  },
  {
    id: 3,
    name: 'Sad man',
    isRead: true,
    updateAt: '5m',
    lastMessage:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1695018436/lonly_fwyyvv.jpg',
  },
  {
    id: 4,
    name: 'Curl',
    updateAt: '1h',
    isRead: true,
    lastMessage:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1694439090/greeting_oayt55.jpg',
  },
  {
    id: 5,
    name: 'Namew',
    updateAt: '1m',
    isRead: false,
    lastMessage: 'In publishing and graphic',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1694497931/goodbye_djgszf.jpg',
  },
  {
    id: 6,
    name: 'Mews',
    updateAt: '8m',
    isRead: true,
    lastMessage:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1693812419/butterflie_podx45.jpg',
  },
  {
    id: 7,
    name: 'Fish',
    updateAt: '1h',
    isRead: false,
    lastMessage:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1693752270/zj6tpy9f6mxowzdsxd78.jpg',
  },
];
