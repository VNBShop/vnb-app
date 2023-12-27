import * as React from 'react';

import {View} from 'react-native';

type BoxProps = {
  width?: number;
  height?: number;
};
export default function Box({width, height}: BoxProps) {
  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    />
  );
}
