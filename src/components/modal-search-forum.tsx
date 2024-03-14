/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {PropsWithChildren} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../UIkit/palette';
import {HEIGHT_DEVICE} from '../UIkit/styles';
import {xmark} from '../assets';
import Box from './ui/box';
import {Icon} from './ui/icon';
import {useDebounce} from '../hooks/useDebounce';
import useSearchUser from '../hooks/forum/useSearchUser';
import Avatar from './ui/avatar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackProps} from '../../types/route';
import useAuth from '../_store/useAuth';

type IProps = PropsWithChildren & {
  isProfile?: boolean;
};

export default function ModalSearchForum({children, isProfile}: IProps) {
  const modalRef = React.useRef<Modalize>();
  const insets = useSafeAreaInsets();
  const {data} = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();

  const [search, setSearch] = React.useState('');

  const searchVal = useDebounce(search, 1300);

  const {loading, users} = useSearchUser({
    name: searchVal,
  });

  const onGoTo = (userId: number) => {
    if (isProfile) {
      if (userId === data?.userId) {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('UserProfile', {
          userId,
        });
      }
    } else {
      navigation.navigate('ConversationDetail', {
        userId,
      });
    }
    !!modalRef?.current && modalRef.current?.close();
  };

  return (
    <>
      <Pressable onPress={() => !!modalRef?.current && modalRef.current.open()}>
        {children}
      </Pressable>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          modalHeight={HEIGHT_DEVICE - insets.top}
          ref={modalRef}
          avoidKeyboardLikeIOS={true}
          HeaderComponent={
            <View style={styles.header}>
              <Box width={20} />
              <Text style={styles.headerTilte}>
                Search {isProfile ? 'user' : 'conversation'}
              </Text>
              <Icon
                icon={xmark}
                onPress={() => !!modalRef.current && modalRef.current?.close()}
                size={20}
              />
            </View>
          }>
          <View>
            <View style={{paddingHorizontal: 20}}>
              <TextInput
                placeholder="Search ..."
                value={search}
                onChangeText={setSearch}
                style={{
                  backgroundColor: color.divider,
                  paddingHorizontal: 16,
                  height: 42,
                  borderRadius: 9999,
                }}
                placeholderTextColor={color.gray}
                autoFocus
              />
            </View>

            {!loading && users?.length && (
              <View
                style={{
                  paddingHorizontal: 20,
                  gap: 16,
                  marginTop: 24,
                }}>
                {users.map(user => (
                  <TouchableOpacity
                    onPress={() => onGoTo(user?.userId)}
                    key={user?.userId}
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                    }}>
                    <Avatar
                      size={47}
                      source={user?.avatar ?? ''}
                      username={user?.fullName ?? 'Z'}
                    />
                    <Text style={{}}>{user?.fullName}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {loading && (
              <View
                style={{
                  paddingHorizontal: 20,
                  gap: 16,
                  marginTop: 24,
                }}>
                {Array.from({length: 7}).map((_, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                    }}>
                    <SkeletonPlaceholder>
                      <View
                        style={{width: 47, height: 47, borderRadius: 9999}}
                      />
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                      <View
                        style={{
                          width: 150,
                          height: 25,
                          borderRadius: 9999,
                        }}
                      />
                    </SkeletonPlaceholder>
                  </View>
                ))}
              </View>
            )}

            {!users?.length && !loading && !!searchVal ? (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 50,
                  color: color.gray,
                }}>
                No result for this search, try again!
              </Text>
            ) : (
              !users?.length &&
              !loading && (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 50,
                    color: color.gray,
                  }}>
                  Search someone {isProfile ? '' : 'to start conversation!'}
                </Text>
              )
            )}
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  headerTilte: {
    fontSize: 15,
    fontWeight: '500',
  },
});
