import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-animatable';
import {color} from '../../UIkit/palette';
import {ProductDetail} from '../../../types/product';
import Avatar from './avatar';

type CommentProductProps = {
  comments: ProductDetail['productComments'];
};

export default function CommentProduct({comments}: CommentProductProps) {
  return (
    <>
      {comments.map((comment, index) => (
        <View style={styles.container} key={index}>
          <View style={styles.avt}>
            <Avatar
              source={comment?.commenterAvatar}
              size={40}
              username={comment?.commenterName}
            />
          </View>

          <View style={styles.content}>
            <Text style={styles.auth}>{comment?.commenterName}</Text>
            <Text style={styles.comment}>{comment?.comment}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
  },
  avt: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  textAvt: {
    color: '#ffffff',
    fontSize: 22,
  },
  containerContent: {
    flex: 1,
  },
  content: {
    backgroundColor: color.superDivider,
    padding: 6,
    borderRadius: 16,
    paddingHorizontal: 12,
    width: 'auto',
    alignSelf: 'stretch',
  },
  auth: {
    fontWeight: '500',
  },
  comment: {
    lineHeight: 24,
    fontWeight: '300',
  },
});
