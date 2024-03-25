import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../../types/route';
import {User} from '../../types/user';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {back} from '../assets';
import Empty from '../components/404';
import CreatePost from '../components/post/create-post';
import PostItem from '../components/post/post-item';
import PostsSkeleton from '../components/products/posts-skeleton';
import ProfileHeader from '../components/profile-header';
import ProfileSkeleton from '../components/skeleton/profile-skeleton';
import Box from '../components/ui/box';
import {Icon} from '../components/ui/icon';
import useFetchUserPosts from '../hooks/user/useFetchPostsUser';
import useFetchUser from '../hooks/user/useFetchUser';

type ProfileScreenProps = NativeStackScreenProps<RootStackProps, 'Profile'>;

export default function ProfileScreen({navigation}: ProfileScreenProps) {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    posts,
    refetch,
  } = useFetchUserPosts();

  const {user, isPending: loadingUser} = useFetchUser();
  return (
    <>
      <SafeArea>
        <View>
          <FlatList
            renderItem={({item}) => (
              <PostItem post={item} queryKey={['get-posts-profile']} />
            )}
            data={posts}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            nestedScrollEnabled
            keyExtractor={item => item?.postId?.toLocaleString()}
            ListHeaderComponent={
              <>
                <View style={styles.header}>
                  <Icon
                    size={25}
                    icon={back}
                    onPress={() => navigation.goBack()}
                  />
                  <Text style={styles.headerUsername}>{user?.firstName}</Text>
                  <Box width={30} />
                </View>

                {loadingUser ? (
                  <ProfileSkeleton />
                ) : (
                  <ProfileHeader user={user as User} nav={navigation} />
                )}

                <CreatePost pageKey="get-posts-profile" />
              </>
            }
            ListFooterComponent={
              <>
                {isFetchingNextPage || isPending ? <PostsSkeleton /> : null}

                {isError && !isPending && !isFetchingNextPage ? (
                  <Empty message="No posts" />
                ) : null}
              </>
            }
            ItemSeparatorComponent={renderSeparator}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            refreshControl={
              <RefreshControl refreshing={isPending} onRefresh={refetch} />
            }
          />
        </View>
      </SafeArea>
    </>
  );
}

const renderSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    width: '40%',
    backgroundColor: color.border_input,
    marginLeft: '60%',
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: '500',
  },

  commentHeader: {
    paddingVertical: 32,
  },
  commentTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
