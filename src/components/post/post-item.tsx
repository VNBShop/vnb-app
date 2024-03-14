/* eslint-disable react-native/no-inline-styles */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Post} from '../../../types/forum';
import {RootStackProps} from '../../../types/route';
import {color} from '../../UIkit/palette';
import {back, ellipsisBlack} from '../../assets';
import useSavePost from '../../hooks/forum/useSavePost';
import Avatar from '../ui/avatar';
import {Icon} from '../ui/icon';
import ImageCarousel from '../ui/image-carousel';
import Status from '../ui/status';
import PostAction from './interaction';
import useReportPost from '../../hooks/forum/useReportPost';
import useDeletePost from '../../hooks/forum/useDeletePost';

type IProps = {
  post: Post;
  isPostDetail?: boolean;
  queryKey?: 'get-posts' | 'get-posts-profile';
  orther?: boolean;
  nav?: NativeStackNavigationProp<RootStackProps, 'PostDetail', undefined>;
};

export default function PostItem({
  post,
  nav,
  isPostDetail,
  queryKey,
  orther = false,
}: IProps) {
  const refAction = React.useRef<Modalize>();
  const insets = useSafeAreaInsets();

  const onCloseAction = () => {
    !!refAction?.current && refAction.current?.close();
  };

  const {loading, onSavePost} = useSavePost({
    onSuccess: () => {
      onCloseAction();
    },
    isDetail: !!isPostDetail,
  });

  const {loadingReport, onReportPost} = useReportPost({
    onSuccess: () => {
      onCloseAction();
    },
    isDetail: !!isPostDetail,
  });

  const {loadingDelete, onDeletePost} = useDeletePost({
    onSuccess: () => {
      onCloseAction();
      if (isPostDetail) {
        nav?.goBack();
      }
    },
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            {!!nav && (
              <Icon
                icon={back}
                size={25}
                style={{
                  marginRight: 8,
                }}
                onPress={() => nav.goBack()}
              />
            )}
            <Avatar
              source={post?.postAuthorAvatar ?? ''}
              size={40}
              username={post?.postAuthorName ?? 'Z'}
            />
            <Text style={styles.username}>{post?.postAuthorName}</Text>
          </View>

          {!orther && (
            <TouchableOpacity
              onPress={() => !!refAction?.current && refAction.current?.open()}>
              <Icon size={30} icon={ellipsisBlack} />
            </TouchableOpacity>
          )}
        </View>

        {!!post?.postContent && (
          <View style={styles.status}>
            <Status status={post?.postContent} />
          </View>
        )}

        {!!post?.postImages?.length && (
          <ImageCarousel photos={post?.postImages ?? []} />
        )}

        <PostAction
          post={post}
          queryKey={queryKey}
          isPostDetail={isPostDetail}
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
              {!post?.yourPost && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      onSavePost({
                        postId: post?.postId,
                      })
                    }
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 16,
                      flexDirection: 'row',
                      gap: 8,
                    }}
                    disabled={!!post?.saved || loading}>
                    {loading && <ActivityIndicator />}
                    <Text
                      style={{
                        fontSize: 18,
                        color: post?.saved ? color.success : color.link,
                      }}>
                      {post?.saved ? 'Saved' : 'Save'}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 0.7,
                      backgroundColor: color.border_input,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 16,
                      flexDirection: 'row',
                      gap: 8,
                    }}
                    onPress={() =>
                      onReportPost({
                        postId: post?.postId,
                      })
                    }
                    disabled={!!post?.reported || loadingReport}>
                    {loadingReport && <ActivityIndicator />}
                    <Text
                      style={{
                        fontSize: 18,
                        color: post?.reported ? color.success : color.link,
                      }}>
                      {post?.reported ? 'Repored' : 'Report'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {post?.yourPost && (
                <TouchableOpacity
                  disabled={loadingDelete}
                  onPress={() =>
                    onDeletePost({
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
                  <Text style={{fontSize: 18, color: color.link}}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  username: {
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
