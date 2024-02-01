import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../../UIkit/palette';

type HrVerticalProps = {
  height?: number | 'auto';
};
export default function HrVertical({height = 'auto'}: HrVerticalProps) {
  return <View style={[styles.hr, {height: height}]} />;
}

const styles = StyleSheet.create({
  hr: {
    width: 0.8,
    backgroundColor: color.border_input,
  },
});
