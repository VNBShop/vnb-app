import * as React from 'react';

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {flex} from '../UIkit/styles';
import {forumP, messenger, search} from '../assets';
import Empty from '../components/404';
import PostsSkeleton from '../components/products/posts-skeleton';
import {Icon, IconOutline} from '../components/ui/icon';
import PostItem from '../components/post/post-item';
import useFetchPosts from '../hooks/forum/useFetchPosts';
import CreatePost from '../components/post/create-post';
import {color} from '../UIkit/palette';

export default function ForumScreen() {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    posts,
    refetch,
  } = useFetchPosts();

  return (
    <>
      <SafeArea>
        {posts?.length && !isError ? (
          <View>
            <FlatList
              nestedScrollEnabled
              renderItem={({item}) => (
                <PostItem post={item} queryKey="get-posts" />
              )}
              data={posts}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={item => item?.postId?.toLocaleString()}
              ListHeaderComponent={
                <>
                  <View style={styles.header}>
                    <Icon size={40} icon={forumP} />

                    <View style={flex.flex_row}>
                      <IconOutline size={36} icon={search} />
                      <IconOutline size={36} icon={messenger} />
                    </View>
                  </View>

                  <CreatePost pageKey="get-posts" />
                </>
              }
              ListFooterComponent={
                isPending || isFetchingNextPage ? (
                  <ActivityIndicator />
                ) : (
                  <BottomSafeArea />
                )
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
        ) : null}

        {isFetchingNextPage || isPending ? <PostsSkeleton /> : null}

        {isError && !isPending && !isFetchingNextPage ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isPending} onRefresh={refetch} />
            }
            showsVerticalScrollIndicator={false}>
            <Empty message="No posts" />
          </ScrollView>
        ) : null}
      </SafeArea>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  actionMid: {
    flex: 1,
  },
  separator: {
    height: 0.5,
    width: '40%',
    backgroundColor: color.border_input,
    marginLeft: '60%',
  },
});

const renderSeparator = () => {
  return <View style={styles.separator} />;
};
