import * as React from 'react';
import {useState} from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {color} from '../../UIkit/palette';

export type AvatarProps = {
  source: ImageProps | string;
  size: number;
  username: string;
  isActive?: boolean;
  style?: StyleProp<ViewStyle>;
};
export default function Avatar({
  source,
  size,
  username,
  isActive,
  style,
}: AvatarProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[styles.avtFallback, {width: size, height: size}, style]}>
        <Text style={styles.username}>{username?.charAt(0)}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, style]}>
      <Image
        source={typeof source === 'string' ? {uri: source} : source}
        style={[styles.avatar, {width: size, height: size}]}
        onError={() => setError(true)}
      />
      {isActive && (
        <View style={styles.activeWrapper}>
          <View style={styles.active} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9999,
    position: 'relative',
    alignSelf: 'flex-start',
  },
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
  activeWrapper: {
    width: 16,
    height: 16,
    backgroundColor: color.white,
    borderRadius: 9999,
    padding: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  active: {
    width: '100%',
    height: '100%',
    backgroundColor: color.success,
    borderRadius: 9999,
  },
});
