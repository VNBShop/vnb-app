import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Avatar from './avatar';
import {Icon} from './icon';
import {commentOutline, ellipsisBlack, heartOutline} from '../../assets';
import Status from './status';
import ImageCarousel from './image-carousel';
import {spec} from '../../UIkit/styles';
import {Modalize} from 'react-native-modalize';

export default function Post({
  commentModalRef,
}: {
  commentModalRef: React.RefObject<Modalize>;
}) {
  const onOpenModalComment = () => {
    commentModalRef.current?.open();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Avatar
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
              }
              size={40}
              username="D"
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
    </>
  );
}

const styles = StyleSheet.create({
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
