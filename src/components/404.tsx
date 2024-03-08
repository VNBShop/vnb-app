/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Text, View, ViewStyle} from 'react-native';
import {empty} from '../assets';
import {color} from '../UIkit/palette';

type IProps = {
  size?: number;
  message?: string;
} & ViewStyle;

export default function Empty({size = 100, message, ...props}: IProps = {}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}>
      <Image
        source={empty}
        style={{
          width: size,
          height: size,
        }}
      />
      {!!message && (
        <Text
          style={{
            marginTop: 16,
            fontSize: 15,
            color: color.gray,
          }}>
          {message}
        </Text>
      )}
    </View>
  );
}
