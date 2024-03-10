/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {FlatList, View} from 'react-native';
import {Post} from '../../types/forum';
import {RootStackProps} from '../../types/route';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import Empty from '../components/404';
import CommentAction from '../components/comment/comment-action';
import CommentCard from '../components/comment/comment-card';
import PostItem from '../components/post/post-item';
import CommentsSkeleton from '../components/skeleton/comments-skeleton';
import useFetchComments from '../hooks/forum/useFetchComments';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import useFetchPost from '../hooks/forum/useFetchPost';
import PostsSkeleton from '../components/products/posts-skeleton';

type IProps = NativeStackScreenProps<RootStackProps, 'PostDetail'>;

export default function PostDetailScreen({route, navigation}: IProps) {
  const post = route?.params?.post;

  const {postData, isPending: fetchingData} = useFetchPost({
    postId: post?.postId as number,
  });

  const [isHaveUpdateCmt, setIsHaveUpdateComment] = React.useState(false);

  const {
    comments,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
  } = useFetchComments({
    postId: post?.postId as number,
  });

  return (
    <KeyboardShift keyboardVerticalOffset={0}>
      <SafeArea>
        <FlatList
          data={comments}
          renderItem={({item}) => (
            <CommentCard
              postId={post?.postId as number}
              setIsHaveUpdateComment={setIsHaveUpdateComment}
              comment={item}
            />
          )}
          ListHeaderComponent={
            <>
              {fetchingData ? (
                <PostsSkeleton />
              ) : (
                <>
                  <PostItem post={postData as Post} nav={navigation} />
                  <View
                    style={{
                      height: 0.7,
                      backgroundColor: color.border_input,
                      width: '70%',
                      marginLeft: '30%',
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
            </>
          }
          ListEmptyComponent={
            (isError || comments?.length) &&
            !isPending &&
            !isFetchingNextPage ? (
              <Empty
                message="No comments"
                showIcon={false}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            ) : null
          }
          ListHeaderComponentStyle={{
            marginBottom: 16,
          }}
          ListFooterComponent={
            !isError &&
            !comments?.length &&
            (isPending || isFetchingNextPage) ? (
              <CommentsSkeleton />
            ) : null
          }
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />

        {!isHaveUpdateCmt && <BottomSafeArea />}

        {!isHaveUpdateCmt && <CommentAction post={post as Post} />}
      </SafeArea>
    </KeyboardShift>
  );
}
