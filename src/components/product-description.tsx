import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../UIkit/palette';
import {ProductDetail} from '../../types/product';

type ProductDescriptionProps = {
  content: ProductDetail['productDetail'];
};

export default function ProductDescription({content}: ProductDescriptionProps) {
  return (
    <View>
      <Text style={styles.title}>Product descriptions</Text>
      {Object.entries(content).map(([key, value], index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.des}>{key}:</Text>
          <Text style={styles.des}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    gap: 6,
  },
  des: {
    lineHeight: 24,
    color: color.gray,
  },
});
