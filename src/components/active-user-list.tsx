import * as React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Avatar from './ui/avatar';
import {color} from '../UIkit/palette';

export default function ActiveUserList() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {fakeListUser.map(user => (
        <TouchableOpacity key={user.id} style={styles.userItem}>
          <Avatar source={user.avatar} username="D" size={60} isActive />
          <Text style={styles.username}>{user.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  userItem: {
    alignItems: 'center',
    gap: 6,
  },
  username: {
    fontSize: 12,
    color: color.gray,
  },
});

export const fakeListUser = [
  {
    id: 1,
    name: 'Dzung',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1695303196/berreck_i387ac.jpg',
  },
  {
    id: 2,
    name: 'Hoe Hoe',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1694877191/littlething_eyzztc.jpg',
  },
  {
    id: 3,
    name: 'Sad man',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1695018436/lonly_fwyyvv.jpg',
  },
  {
    id: 4,
    name: 'Curl',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1694439090/greeting_oayt55.jpg',
  },
  {
    id: 5,
    name: 'Namew',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1694497931/goodbye_djgszf.jpg',
  },
  {
    id: 6,
    name: 'Mews',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1693812419/butterflie_podx45.jpg',
  },
  {
    id: 7,
    name: 'Fish',
    avatar:
      'https://res.cloudinary.com/drpksxymr/image/upload/v1693752270/zj6tpy9f6mxowzdsxd78.jpg',
  },
];
