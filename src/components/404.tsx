/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Text, View, ViewProps} from 'react-native';
import {color} from '../UIkit/palette';
import {empty} from '../assets';

type IProps = {
  size?: number;
  message?: string;
  showIcon?: boolean;
} & ViewProps;

export default function Empty({
  size = 100,
  message,
  showIcon = true,
  ...props
}: IProps = {}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}>
      {showIcon && (
        <Image
          source={empty}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
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
