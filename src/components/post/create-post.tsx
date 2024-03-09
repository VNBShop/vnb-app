import * as React from 'react';

import {Pressable, StyleSheet, Text, View} from 'react-native';
import Avatar from '../ui/avatar';
import {common} from '../../UIkit/styles';
import CameraRoll from '../camera-roll';

export default function CreatePost() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
