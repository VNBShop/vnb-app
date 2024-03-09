/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
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
import Avatar from '../ui/avatar';
import useDeleteComment from '../../hooks/forum/useDeleteComment';

type IProps = {
  comment: Comment;
  postId: Post['postId'];
};

export default function CommentCard({comment, postId}: IProps) {
  const refAction = React.useRef<Modalize>();
  const insets = useSafeAreaInsets();

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

  return (
    <>
      <View style={styles.container}>
        <Avatar
          source={comment?.commentatorAvatar ?? ''}
          username={comment?.commentatorName ?? ''}
          size={40}
        />

        <TouchableOpacity style={styles.comment} onLongPress={onLongPress}>
          <Text style={styles.textTor}>{comment?.commentatorName}</Text>
          <Text style={common.text_gray}>{comment?.commentContent}</Text>
        </TouchableOpacity>
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
