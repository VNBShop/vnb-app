import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from '../UIkit/palette';

export default function HrVertical() {
  return <View style={styles.hr} />;
}

const styles = StyleSheet.create({
  hr: {
    width: 0.8,
    height: 20,
    backgroundColor: color.border_input,
  },
});
