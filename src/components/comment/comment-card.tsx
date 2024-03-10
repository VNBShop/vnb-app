/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-animatable';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Comment, Post} from '../../../types/forum';
import {color} from '../../UIkit/palette';
import {common} from '../../UIkit/styles';
import useDeleteComment from '../../hooks/forum/useDeleteComment';
import Avatar from '../ui/avatar';
import useEditComment from '../../hooks/forum/useEditComment';

type IProps = {
  comment: Comment;
  postId: Post['postId'];
  setIsHaveUpdateComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CommentCard({
  comment,
  postId,
  setIsHaveUpdateComment,
}: IProps) {
  const refAction = React.useRef<Modalize>();
  const inputRef = React.useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  const [updateForm, setUpdateForm] = React.useState(false);

  const form = useForm<{commentValue: string}>({
    defaultValues: {
      commentValue: '',
    },
  });

  const {loading: loadingEdit, onEditComment} = useEditComment({
    onSuccess: () => {
      onCloseUpdateForm();
    },
    postId,
  });

  const onSubmitEdit = ({commentValue}: {commentValue: string}) => {
    console.log('comment??', commentValue);
    if (!commentValue) {
      return;
    }

    onEditComment({
      comment: commentValue,
      commentId: comment?.commentId,
    });
  };

  const onLongPress = () => {
    !!refAction?.current && refAction?.current?.open();
  };

  const onClose = () => {
    !!refAction?.current && refAction?.current?.close();
  };

  const {loading, onDeleteComment} = useDeleteComment({
    postId: postId,
    onClose: onClose,
  });

  const onCloseUpdateForm = () => {
    setIsHaveUpdateComment(false);
    setUpdateForm(false);
    !!inputRef?.current && inputRef.current?.blur();
  };

  React.useEffect(() => {
    if (updateForm) {
      form.setValue('commentValue', comment?.commentContent ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateForm, comment?.commentContent]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingVertical: updateForm ? 32 : 0,
          },
        ]}>
        <Avatar
          source={comment?.commentatorAvatar ?? ''}
          username={comment?.commentatorName ?? ''}
          size={40}
        />

        {!updateForm ? (
          <TouchableOpacity style={styles.comment} onLongPress={onLongPress}>
            <Text style={styles.textTor}>{comment?.commentatorName}</Text>
            <Text style={common.text_gray}>{comment?.commentContent}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.containerUpdate}>
            <Controller
              control={form.control}
              name="commentValue"
              render={({field: {onChange, value}}) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  multiline
                  maxLength={200}
                  autoFocus={!!updateForm}
                  style={{marginBottom: 12}}
                />
              )}
            />
            <View style={styles.containerUpdateAction}>
              <TouchableOpacity
                style={styles.btnAction}
                disabled={loadingEdit}
                onPress={onCloseUpdateForm}>
                <Text
                  style={{
                    color: color.danger,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loadingEdit}
                onPress={() => form.handleSubmit(onSubmitEdit)()}
                style={[
                  styles.btnAction,
                  {
                    backgroundColor: color.link,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  },
                ]}>
                {loadingEdit ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{color: '#ffffff'}}>Update</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
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
                onPress={onClose}
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
              {comment?.yourComment && (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setIsHaveUpdateComment(true);
                      setUpdateForm(true);
                      onClose();
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 16,
                      flexDirection: 'row',
                      gap: 8,
                    }}
                    disabled={loading}>
                    <Text style={{fontSize: 18, color: color.link}}>Edit</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 0.7,
                      backgroundColor: color.border_input,
                    }}
                  />
                </>
              )}
              <TouchableOpacity
                onPress={() =>
                  onDeleteComment({commnentId: comment?.commentId})
                }
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  flexDirection: 'row',
                  gap: 8,
                }}
                disabled={loading}>
                {loading && <ActivityIndicator color={color.link} />}
                <Text style={{fontSize: 18, color: color.link}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  btnAction: {
    borderRadius: 6,
    padding: 8,
    paddingHorizontal: 16,
  },
  containerUpdateAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerUpdate: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    bottom: 0,
    left: 64,
    right: 0,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: color.border_input,
    width: 250,
  },
  textTor: {
    fontWeight: '500',
    marginBottom: 4,
  },
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  comment: {
    padding: 8,
    marginTop: -4,
    alignSelf: 'flex-start',
    backgroundColor: '#ebecee',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
});
