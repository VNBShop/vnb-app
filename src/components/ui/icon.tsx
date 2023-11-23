import * as React from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {color} from '../../UIkit/palette';

export type IconOutlineProps = {
  size: number;
  icon: ImageProps;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
export function IconOutline({icon, size, onPress, style}: IconOutlineProps) {
  const iconSize = size * 0.6;
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.iconOutline, {width: size, height: size}, style]}>
        <Image source={icon} style={{width: iconSize, height: iconSize}} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.iconOutline, {width: size, height: size}, style]}>
      <Image source={icon} style={{width: iconSize, height: iconSize}} />
    </View>
  );
}

export function Icon({icon, size, onPress, style}: IconOutlineProps) {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Image source={icon} style={{width: size, height: size}} />
      </TouchableOpacity>
    );
  }
  return (
    <View style={style}>
      <Image source={icon} style={{width: size, height: size}} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconOutline: {
    borderRadius: 9999,
    backgroundColor: color.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
