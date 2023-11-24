import * as React from 'react';
import {Animated, StyleSheet, View, useWindowDimensions} from 'react-native';
import {color} from '../../UIkit/palette';

export default function Pagination({
  data,
  scrollX,
}: {
  data: any;
  scrollX: Animated.Value;
}) {
  const {width} = useWindowDimensions();
  return (
    <View style={style.container}>
      {data.map((_: unknown, index: number) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [6, 14, 6],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[style.dot, {width: dotWidth, opacity}]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: color.secondary,
  },
});
