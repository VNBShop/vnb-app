import * as React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {flex} from '../UIkit/styles';
import {forumP, messenger, search} from '../assets';
import Empty from '../components/404';
import ModalSearchForum from '../components/modal-search-forum';
import CreatePost from '../components/post/create-post';
import PostItem from '../components/post/post-item';
import PostsSkeleton from '../components/products/posts-skeleton';
import {Icon, IconOutline} from '../components/ui/icon';
import useFetchPosts from '../hooks/forum/useFetchPosts';

export default function ForumScreen() {
  const nav =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    isRefetching,
    posts,
    refetch,
  } = useFetchPosts();

  return (
    <>
      <SafeArea>
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
                    <ModalSearchForum isProfile>
                      <IconOutline size={36} icon={search} />
                    </ModalSearchForum>
                    <IconOutline
                      size={36}
                      icon={messenger}
                      onPress={() => nav.navigate('ConversationList')}
                    />
                  </View>
                </View>

                <CreatePost pageKey="get-posts" />
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
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
          />
        </View>
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
