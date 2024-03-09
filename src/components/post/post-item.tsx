import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Post} from '../../../types/forum';
import {back, ellipsisBlack} from '../../assets';
import Avatar from '../ui/avatar';
import {Icon} from '../ui/icon';
import ImageCarousel from '../ui/image-carousel';
import Status from '../ui/status';
import PostAction from './interaction';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackProps} from '../../../types/route';

type IProps = {
  post: Post;
  nav?: NativeStackNavigationProp<RootStackProps, 'PostDetail', undefined>;
};

export default function PostItem({post, nav}: IProps) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            {!!nav && (
              <Icon
                icon={back}
                size={25}
                // eslint-disable-next-line react-native/no-inline-styles
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

          <TouchableOpacity>
            <Icon size={30} icon={ellipsisBlack} />
          </TouchableOpacity>
        </View>

        {!!post?.postContent && (
          <View style={styles.status}>
            <Status status={post?.postContent} />
          </View>
        )}

        {!!post?.postImages?.length && (
          <View style={styles.container}>
            <ImageCarousel photos={post?.postImages ?? []} />
          </View>
        )}

        <PostAction post={post} />
      </View>
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
