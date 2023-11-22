import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../UIkit/palette';

export default function ProductDescription() {
  return (
    <View>
      <Text style={styles.title}>Product descriptions</Text>
      <Text style={styles.des}>
        Mặt vợt: 100in2 {'\n'}
        Chiều dài: 27in {'\n'}
        Mật độ lưới: 16 x 19 {'\n'}
        Điểm cân bằng (chưa cước): 330mm {'\n'}
        Trọng lượng (chưa cước): 265g {'\n'}
        Độ cứng: 70 {'\n'}
        Mức căng 23 - 27kg
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 8,
  },
  des: {
    lineHeight: 24,
    color: color.gray,
  },
});
