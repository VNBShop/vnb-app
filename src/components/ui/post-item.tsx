import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Avatar from './avatar';
import {Icon} from './icon';
import {commentOutline, ellipsisBlack, heartOutline} from '../../assets';
import Status from './status';
import ImageCarousel from './image-carousel';
import {HEIGHT_DEVICE, spec} from '../../UIkit/styles';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Post} from '../../../types/forum';

type IProps = {
  post: Post;
};

export default function PostItem({post}: IProps) {
  const commentModalRef = React.useRef<Modalize>();
  const onOpenModalComment = () => {
    commentModalRef.current?.open();
  };

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Avatar
              source={post?.postAuthorAvatar ?? ''}
              size={40}
              username={post?.postAuthorName ?? 'Z'}
            />
            <Text style={styles.username}>Dzung</Text>
          </View>

          <TouchableOpacity>
            <Icon size={30} icon={ellipsisBlack} />
          </TouchableOpacity>
        </View>

        <View style={styles.status}>
          <Status />
        </View>

        <View style={styles.container}>
          <ImageCarousel data={fakeData} />
        </View>

        <View style={styles.action}>
          <TouchableOpacity>
            <Icon size={25} icon={heartOutline} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onOpenModalComment}>
            <Icon size={25} icon={commentOutline} />
          </TouchableOpacity>
        </View>

        <View style={spec.space_horizontal}>
          <Text>{Number(23123).toLocaleString()} likes</Text>
        </View>
      </View>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          modalHeight={HEIGHT_DEVICE - insets.top}
          ref={commentModalRef}
          HeaderComponent={
            <View style={styles.commentHeader}>
              <Text style={styles.commentTitle}>Comments</Text>
            </View>
          }>
          <View>
            <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 8}}>
              No comment yet
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 8}}>
              Be the first comment
            </Text>
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  commentHeader: {
    paddingVertical: 32,
  },
  commentTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    paddingVertical: 16,
  },
  username: {
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});

const fakeData = [
  'https://res.cloudinary.com/drpksxymr/image/upload/v1697938771/conmeobeo_u0ij51.jpg',
  'https://res.cloudinary.com/drpksxymr/image/upload/v1697782603/chungtacuahientai_jyhnky.jpg',
  'https://res.cloudinary.com/drpksxymr/image/upload/v1694873262/imup_tc5tmi.jpg',
];
