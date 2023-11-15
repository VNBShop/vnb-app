/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../UIkit/palette';
import {common} from '../UIkit/styles';

export default function OrHr() {
  return (
    <View style={styles.container}>
      <View style={styles.hr} />
      <Text style={common.text_gray}>or</Text>
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: color.border_input,
  },
});
