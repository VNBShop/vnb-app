/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {HEIGHT_DEVICE, common, flex} from '../UIkit/styles';
import {forumP, messenger, search} from '../assets';
import Avatar from '../components/ui/avatar';
import {Icon, IconOutline} from '../components/ui/icon';
import Post from '../components/ui/post';
import CameraRoll from '../components/camera-roll';

export default function ForumScreen() {
  const insets = useSafeAreaInsets();

  const commentModalRef = React.useRef<Modalize>(null);

  return (
    <>
      <SafeArea>
        <View style={styles.header}>
          <Icon size={40} icon={forumP} />

          <View style={flex.flex_row}>
            <IconOutline size={35} icon={search} />
            <IconOutline size={35} icon={messenger} />
          </View>
        </View>

        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.container}>
          <View style={styles.action}>
            <Avatar
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
              }
              size={40}
              username="D"
            />

            <Pressable style={styles.actionMid}>
              <Text style={common.text_gray}>What's on your mind?</Text>
            </Pressable>

            <CameraRoll />
          </View>

          {Array.from('123455').map((_: unknown, index: number) => (
            <Post key={index.toString()} commentModalRef={commentModalRef} />
          ))}
          <BottomSafeArea />
        </ScrollView>
      </SafeArea>

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
          <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 8}}>
            No comment yet
          </Text>
          <Text style={{textAlign: 'center', marginBottom: 8}}>
            Be the first comment
          </Text>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  actionMid: {
    flex: 1,
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
