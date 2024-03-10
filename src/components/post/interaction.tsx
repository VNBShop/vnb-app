import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Post} from '../../../types/forum';
import {RootStackProps} from '../../../types/route';
import {color} from '../../UIkit/palette';
import {commentOutline, heart, heartOutline} from '../../assets';
import {Icon} from '../ui/icon';
import useLikePost from '../../hooks/forum/useLikePost';

type IProps = {
  post: Post;
};
export default function PostAction({post}: IProps) {
  const navigation = useNavigation<NavigationProp<RootStackProps>>();

  const [react, setReact] = React.useState(false);
  const [totalReaction, setTotalReaction] = React.useState(0);

  const {onLike} = useLikePost({
    setReact,
    setTotalReaction,
  });

  React.useEffect(() => {
    if (post?.reacted) {
      setReact(true);
    } else {
      setReact(false);
    }

    if (post?.totalReaction) {
      setTotalReaction(post.totalReaction);
    } else {
      setTotalReaction(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(post)]);

  return (
    <>
      <>
        <View style={styles.action}>
          <TouchableOpacity
            onPress={() =>
              onLike({
                postId: post?.postId,
                reacted: react,
              })
            }>
            <Icon size={25} icon={react ? heart : heartOutline} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostDetail', {
                post: post,
              })
            }>
            <Icon size={25} icon={commentOutline} />
          </TouchableOpacity>
        </View>

        <View style={styles.reactInfo}>
          <Text style={styles.reactInfoText}>{totalReaction ?? 0} likes</Text>
          <Text>·</Text>
          <Text style={styles.reactInfoText}>
            {post?.totalComment ?? 0} replies
          </Text>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  reactInfoText: {
    color: color.gray,
  },
  reactInfo: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noText: {textAlign: 'center', marginBottom: 8},
  noTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8,
  },
  commentHeader: {
    paddingVertical: 32,
  },
  commentTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
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
