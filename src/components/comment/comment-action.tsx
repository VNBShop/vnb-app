/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Post} from '../../../types/forum';
import {color} from '../../UIkit/palette';
import useAuth from '../../_store/useAuth';
import {messenger} from '../../assets';
import useCreateComment from '../../hooks/forum/useCreateComment';
import Avatar from '../ui/avatar';
import {Icon} from '../ui/icon';

type IProps = {
  post: Post;
};

export default function CommentAction({post}: IProps) {
  const form = useForm<{comment: string}>({
    defaultValues: {
      comment: '',
    },
  });
  const insets = useSafeAreaInsets();

  const inputRef = React.useRef<TextInput>(null);

  const {loading, onComment} = useCreateComment({
    postId: post?.postId,
    onSuccess: () => {
      !!inputRef?.current && inputRef.current?.blur();
      form.reset();
    },
  });
  const {data} = useAuth();

  const onSubmit = ({comment}: {comment: string}) => {
    if (!comment) {
      return;
    }

    onComment({
      comment,
    });
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        paddingBottom: insets.bottom,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        borderTopColor: color.border_input,
        borderTopWidth: 0.5,
        paddingTop: 8,
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#ffffff',
        alignItems: 'center',
      }}>
      <Avatar
        size={40}
        source={data?.avatar ?? ''}
        username={data?.firstName ?? data?.lastName ?? 'Z'}
      />

      <Controller
        control={form.control}
        name="comment"
        render={({field: {onChange, value}}) => (
          <TextInput
            ref={inputRef}
            onChangeText={onChange}
            value={value}
            style={{
              flex: 1,
              backgroundColor: '#ebecee',
              borderRadius: 9999,
              paddingHorizontal: 12,
              verticalAlign: 'middle',
              height: 40,
            }}
            returnKeyType="send"
            onSubmitEditing={() => form.handleSubmit(onSubmit)()}
            placeholder={`Reply to ${post?.postAuthorName}`}
            // multiline
            // numberOfLines={4}
          />
        )}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Icon
          icon={messenger}
          size={25}
          onPress={() => form.handleSubmit(onSubmit)()}
        />
      )}
    </View>
  );
}
