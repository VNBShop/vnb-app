import {StyleProp, View, ViewStyle, ViewProps} from 'react-native';
import React from 'react';

export type SizeBoxProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
} & ViewProps; // Extend ViewProps

export default function SizeBox({
  width = 1,
  height = 1,
  style,
  ...rest
}: SizeBoxProps) {
  const containerStyle = {width, height, ...(style as object)};

  return <View style={containerStyle} {...rest} />;
}
