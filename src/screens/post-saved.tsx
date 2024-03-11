/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {back} from '../assets';
import Empty from '../components/404';
import PostSavedCard from '../components/post-saved-card';
import PostsSkeleton from '../components/products/posts-skeleton';
import Box from '../components/ui/box';
import {Icon} from '../components/ui/icon';
import useFetchPostSaved from '../hooks/user/useFetchPostSaved';

type IProps = NativeStackScreenProps<RootStackProps, 'PostSaved'>;

export default function PostSavedScreen({navigation}: IProps) {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    isRefetching,
    postsSaved,
    refetch,
  } = useFetchPostSaved();

  return (
    <SafeArea>
      <View style={{paddingHorizontal: 16}}>
        <FlatList
          renderItem={({item}) => (
            <PostSavedCard nav={navigation} post={item} />
          )}
          data={postsSaved}
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
                <Text style={styles.headerUsername}>Posts saved</Text>
                <Box width={30} />
              </View>
            </>
          }
          ListFooterComponent={
            isFetchingNextPage || isPending ? (
              <PostsSkeleton />
            ) : (
              <BottomSafeArea />
            )
          }
          ListEmptyComponent={
            <>
              {(isError || !postsSaved?.length) &&
              !isFetchingNextPage &&
              !isPending ? (
                <View style={{marginTop: 100, marginHorizontal: 'auto'}}>
                  <Empty message="No posts saved!" />
                </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginBottom: 16,
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
