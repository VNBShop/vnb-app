import * as React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common, flex} from '../UIkit/styles';
import {forwardGray, search, setting} from '../assets';
import Avatar from '../components/ui/avatar';
import {Icon, IconOutline} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import {actionOption, navPerson} from '../libs/contants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackProps} from '../../types/route';
import useAuth from '../_store/useAuth';
import {useMutation} from '@tanstack/react-query';
import {DataError, DataResponse} from '../../types/auth';
import useAxiosPrivate from '../api/private/hook/useAxiosPrivate';
import ModalSearchForum from '../components/modal-search-forum';

export default function PersonalScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();

  const {logout, data} = useAuth(state => state);

  const axios = useAxiosPrivate();

  const {mutate: logoutFromBE, isPending} = useMutation<
    DataResponse,
    DataError,
    unknown,
    unknown
  >({
    mutationFn: async () => {
      const res = await axios.post('/user-service/api/v1/account/logout');

      return res;
    },
    onSuccess: res => {
      if (res?.data?.success) {
        logout();
      }
    },
    onError: error => {
      console.log('error >>', error);
    },
  });

  const onLogout = () => {
    Alert.alert('Logout of your account?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: isPending ? 'Logout...' : 'Logout',
        onPress: () => logoutFromBE({}),
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeArea color={color.superDivider}>
      <View style={styles.container}>
        <ScrollView>
          <View style={flex.between}>
            <Text style={common.titleLeft}>Account</Text>

            <View style={flex.flex_row}>
              <IconOutline icon={setting} size={36} />
              <ModalSearchForum isProfile>
                <IconOutline icon={search} size={36} />
              </ModalSearchForum>
            </View>
          </View>

          <Pressable
            style={styles.info}
            onPress={() => navigation.navigate('Profile')}>
            <View style={styles.infoL}>
              <Avatar
                source={data?.avatar ?? ''}
                size={50}
                username={data?.firstName ?? data?.lastName ?? 'Z'}
              />

              <View>
                <Text style={styles.name}>
                  {data?.firstName || data?.lastName
                    ? `${data?.firstName} ${data?.lastName}`
                    : data?.email}
                </Text>
                <Text style={styles.username}>{data?.email}</Text>
              </View>
            </View>

            <Icon icon={forwardGray} size={22} />
          </Pressable>

          <View style={styles.navContainer}>
            {navPerson.map(nav => (
              <TouchableOpacity
                key={nav.id}
                style={styles.navItem}
                onPress={() =>
                  navigation.navigate('Ordered', {
                    tab: nav.id,
                  })
                }>
                <View style={styles.navIcon}>
                  <Icon icon={nav.logo} size={24} />
                </View>
                <Text style={[common.text_gray, common.fz13]}>{nav.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionContainer}>
            {actionOption.map(item => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.actionItem}
                  onPress={() => {
                    item.label === 'Logout'
                      ? onLogout()
                      : navigation.navigate(item.redirect as any);
                  }}>
                  <View style={styles.actionItemL}>
                    <View
                      style={[
                        styles.iconWrapper,
                        {backgroundColor: item.bgColor},
                      ]}>
                      <Image source={item.icon} style={styles.icon} />
                    </View>

                    <Text style={styles.label}>{item.label}</Text>
                  </View>

                  <Icon icon={forwardGray} size={20} />
                </TouchableOpacity>

                {actionOption[actionOption.length - 1] !== item && (
                  <OrHr style={styles.orHr} />
                )}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  headerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    padding: 12,
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
    marginTop: 16,
  },
  infoL: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    color: color.gray,
    marginTop: 4,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  navItem: {
    width: (WIDTH_DEVICE - 56) / 4,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 50,
    height: 50,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
  },
  actionContainer: {
    marginTop: 24,
    backgroundColor: color.white,
    borderRadius: 8,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  actionItemL: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 16,
  },
  orHr: {
    paddingHorizontal: 0,
    paddingLeft: 50,
  },
});
