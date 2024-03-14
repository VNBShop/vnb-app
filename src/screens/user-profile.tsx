import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../../types/route';
import {User} from '../../types/user';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {back} from '../assets';
import Empty from '../components/404';
import PostItem from '../components/post/post-item';
import PostsSkeleton from '../components/products/posts-skeleton';
import ProfileHeader from '../components/profile-header';
import ProfileSkeleton from '../components/skeleton/profile-skeleton';
import Box from '../components/ui/box';
import {Icon} from '../components/ui/icon';
import useFetchUserAcc from '../hooks/user/useFetchUserAcc';
import useFetchUserPostsAcc from '../hooks/user/useFetchUsetPostAcc';

type IProps = NativeStackScreenProps<RootStackProps, 'UserProfile'>;

export default function UserProfileScreen({navigation, route}: IProps) {
  const userId = route?.params?.userId;
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    posts,
    refetch,
  } = useFetchUserPostsAcc({
    userId,
  });

  const {loading, userAccount} = useFetchUserAcc({
    userId,
  });

  return (
    <>
      <SafeArea>
        <View>
          <FlatList
            renderItem={({item}) => (
              <PostItem
                orther={true}
                post={item}
                queryKey="get-posts-profile"
              />
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
                  <Text style={styles.headerUsername}>
                    {userAccount?.firstName}
                  </Text>
                  <Box width={30} />
                </View>

                {loading ? (
                  <ProfileSkeleton />
                ) : (
                  <ProfileHeader user={userAccount as User} isUser={false} />
                )}
              </>
            }
            ListFooterComponent={
              <>
                {isFetchingNextPage || isPending ? (
                  <PostsSkeleton />
                ) : (
                  <BottomSafeArea />
                )}

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
