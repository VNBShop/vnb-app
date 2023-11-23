/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../../UIkit/palette';
import {common} from '../../UIkit/styles';

export default function OrHr({
  isText = false,
  marginVertical,
}: {
  isText?: boolean;
  marginVertical?: number;
}) {
  return (
    <View style={[styles.container, {marginVertical: marginVertical}]}>
      <View style={styles.hr} />
      {isText && <Text style={common.text_gray}>or</Text>}
      {isText && <View style={styles.hr} />}
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
