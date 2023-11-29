import * as React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {back, heart, photo} from '../assets';
import {Icon} from '../components/ui/icon';
import {flex} from '../UIkit/styles';
import Avatar from '../components/ui/avatar';
import {color} from '../UIkit/palette';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../types/route';
import Chat from '../components/chat';

type ConversationDetailScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ConversationDetail'
>;
export default function ConversationDetailScreen({
  navigation,
}: ConversationDetailScreenProps) {
  const [chats, setChats] = React.useState(chatlists);

  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    // Scroll to the end of the ScrollView when chats change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [chats]);
  return (
    <KeyboardShift>
      <SafeArea>
        <View style={styles.header}>
          <View style={flex.flex_row}>
            <Icon icon={back} size={25} onPress={() => navigation.goBack()} />
            <Avatar
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1695303196/berreck_i387ac.jpg'
              }
              size={40}
              username="D"
              isActive
            />
            <View>
              <Text style={styles.name}>Dzung</Text>
              <Text style={styles.active}>Active now</Text>
            </View>
          </View>
        </View>

        <View style={styles.messContainer}>
          <ScrollView contentContainerStyle={styles.chats} ref={scrollViewRef}>
            <Chat chats={chats} />
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <Icon size={32} icon={photo} />
          <TextInput style={styles.textInput} placeholder="Aa" />
          <Icon size={30} icon={heart} />
        </View>
      </SafeArea>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
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

const chatlists = [
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content: 'Dzung',
  },
  {
    sender: 2,
    receiver: 1,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    sender: 1,
    receiver: 2,
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];
