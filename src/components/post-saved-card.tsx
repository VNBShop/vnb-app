/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Post} from '../../types/forum';
import {Icon} from './ui/icon';
import {ellipsisBlack} from '../assets';
import {color} from '../UIkit/palette';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackProps} from '../../types/route';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import useUnsavePost from '../hooks/user/useUnSavePost';

type IProps = {
  post: Post;
  nav: NativeStackNavigationProp<RootStackProps, 'PostSaved', undefined>;
};
export default function PostSavedCard({post, nav}: IProps) {
  const refAction = React.useRef<Modalize>();
  const insets = useSafeAreaInsets();

  const onCloseAction = () => {
    !!refAction?.current && refAction.current?.close();
  };

  const {loadingDelete, onUnsavePost} = useUnsavePost({
    onSuccess: onCloseAction,
  });

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        <Image
          source={{
            uri: post?.postImages[0] ?? post?.postAuthorAvatar ?? '',
          }}
          style={{
            width: 120,
            height: 80,
            objectFit: 'cover',
            borderRadius: 6,
          }}
        />
        <Pressable
          onPress={() =>
            nav.navigate('PostDetail', {
              post,
            })
          }
          style={{
            flex: 1,
          }}>
          <Text numberOfLines={2} ellipsizeMode="clip">
            {post?.postContent}
          </Text>
          <Text style={{color: color.gray, marginTop: 8}}>
            {post?.postAuthorName}
          </Text>
        </Pressable>

        <Icon
          icon={ellipsisBlack}
          onPress={() => !!refAction?.current && refAction.current?.open()}
          size={28}
        />
      </View>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={true}
          overlayStyle={{backgroundColor: 'rgba(255, 255, 255, 0)'}}
          modalStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
          }}
          adjustToContentHeight
          FooterComponent={
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <TouchableOpacity
                onPress={onCloseAction}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    color: color.danger,
                    fontSize: 17,
                    fontWeight: '500',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          }
          FloatingComponent={
            <View
              style={{
                height: insets.bottom,
              }}
            />
          }
          ref={refAction}>
          <View style={{marginHorizontal: 16, marginBottom: 8}}>
            <View style={{backgroundColor: '#ffffff', borderRadius: 8}}>
              <TouchableOpacity
                disabled={loadingDelete}
                onPress={() =>
                  onUnsavePost({
                    postId: post?.postId,
                  })
                }
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  flexDirection: 'row',
                  gap: 8,
                }}>
                {loadingDelete && <ActivityIndicator />}
                <Text style={{fontSize: 18, color: color.link}}>Unsave</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </>
  );
}
