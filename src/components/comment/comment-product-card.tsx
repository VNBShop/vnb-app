/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductComment, ProductDetail} from '../../../types/product';
import {color} from '../../UIkit/palette';
import {common} from '../../UIkit/styles';
import useDeleteProductCmt from '../../hooks/product/useDeleteCommentProduct';
import Avatar from '../ui/avatar';

type IProps = {
  comment: ProductComment;
  productId: ProductDetail['productId'];
};

export default function CommentProductCard({comment, productId}: IProps) {
  const refAction = React.useRef<Modalize>();
  const insets = useSafeAreaInsets();

  const onLongPress = () => {
    if (!comment?.yourComment) {
      return;
    }
    !!refAction?.current && refAction?.current?.open();
  };

  const onClose = () => {
    !!refAction?.current && refAction?.current?.close();
  };

  const {loading, onDeleteCmtProduct} = useDeleteProductCmt({
    productId: productId,
    onSuccess: onClose,
  });

  return (
    <>
      <View style={[styles.container]}>
        <Avatar
          source={comment?.commentAuthorAvatar ?? ''}
          username={comment?.commentAuthor ?? ''}
          size={40}
        />

        <TouchableOpacity style={styles.comment} onLongPress={onLongPress}>
          <Text style={styles.textTor}>{comment?.commentAuthor}</Text>
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
                  onDeleteCmtProduct({commentId: comment?.commentId})
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
