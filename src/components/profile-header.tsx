import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackProps} from '../../types/route';
import {User} from '../../types/user';
import {color} from '../UIkit/palette';
import {common} from '../UIkit/styles';
import {
  birthday,
  gender,
  locationBlue,
  messengerwhite,
  penWhite,
  phone,
} from '../assets';
import Avatar from './ui/avatar';
import {Icon} from './ui/icon';
import {useNavigation} from '@react-navigation/native';

type IProps = {
  user: User;
  userId?: number;
  isUser?: boolean;
  nav?: NativeStackNavigationProp<RootStackProps, 'Profile', undefined>;
};

export default function ProfileHeader({
  user,
  nav,
  isUser = true,
  userId,
}: IProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'UserProfile'>>();
  return (
    <View style={styles.userContainer}>
      <View style={styles.userHead}>
        <View style={styles.avt}>
          <Avatar
            source={user?.avatar ?? ''}
            size={90}
            username={user?.firstName ?? user?.lastName ?? 'Z'}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoName}>
          {user?.firstName || user?.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : user?.email}
        </Text>
        <Text>{user?.email}</Text>
      </View>

      {isUser ? (
        <View style={styles.userAction}>
          <TouchableOpacity
            onPress={() => nav?.navigate('UpdateProfile', {user})}
            style={[styles.actionBtn, {backgroundColor: color.link}]}>
            <Icon icon={penWhite} size={18} />
            <Text style={[styles.actionText, common.text_white]}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userAction}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ConversationDetail', {
                userId: userId as number,
              })
            }
            style={[styles.actionBtn]}>
            <Icon icon={messengerwhite} size={18} />
            <Text style={[styles.actionText, common.text_white]}>
              Messenger
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Icon icon={gender} size={22} />
          <Text>
            {user?.gender
              ?.toLowerCase()
              ?.replace(/\b\w/g, c => c.toUpperCase()) ?? '-'}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Icon icon={birthday} size={20} />
          <Text>
            {user?.dateOfBirth
              ? dayjs(user?.dateOfBirth).format('DD/MM/YYYY')
              : '-'}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Icon icon={phone} size={20} />
          <Text>{user?.phoneNumber ?? '-'}</Text>
        </View>

        <View style={styles.infoItem}>
          <Icon icon={locationBlue} size={20} />
          <Text>{user?.address ?? '-'}</Text>
        </View>

        <View style={styles.hr} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hr: {
    width: '70%',
    height: 0.5,
    marginLeft: '30%',
    backgroundColor: color.border_input,
    marginTop: 24,
  },
  info: {marginVertical: 16, gap: 8},
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  userHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  avt: {
    position: 'relative',
  },
  avtActionWrap: {
    padding: 3,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: 999,
  },
  avtAction: {
    width: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.link,
    borderRadius: 9999,
  },
  avtActionText: {
    fontSize: 18,
    fontWeight: '500',
    color: color.white,
  },
  flow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  flowItem: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 6,
  },
  flowItemW: {
    fontWeight: '500',
  },
  infoContainer: {
    marginVertical: 16,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionBtn: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 13,
    borderRadius: 6,
    gap: 8,
    backgroundColor: color.link,
  },
  actionText: {
    fontWeight: '500',
  },
  userContent: {
    marginTop: 16,
    gap: 32,
  },
});
