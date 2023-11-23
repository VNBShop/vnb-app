import * as React from 'react';
import {useState} from 'react';
import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import {color} from '../../UIkit/palette';

export type AvatarProps = {
  source: ImageProps | string;
  size: number;
  username: string;
};
export default function Avatar({source, size, username}: AvatarProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[styles.avtFallback, {width: size, height: size}]}>
        <Text style={styles.username}>{username}</Text>
      </View>
    );
  }

  return (
    <Image
      source={typeof source === 'string' ? {uri: source} : source}
      style={[styles.avatar, {width: size, height: size}]}
      onError={() => setError(true)}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 9999,
  },
  avtFallback: {
    borderRadius: 9999,
    backgroundColor: color.primary,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: '#ffffff',
    fontWeight: '500',
  },
});
