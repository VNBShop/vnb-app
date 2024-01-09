import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {WIDTH_DEVICE} from '../../UIkit/styles';

export default function SearchSkeleton() {
  return (
    <>
      {Array.from({length: 7}).map((_, index) => (
        <SkeletonPlaceholder key={index}>
          <View style={styles.item}>
            <View style={styles.image} />

            <View>
              <View style={styles.name} />
              <View style={styles.price} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 9999,
  },
  name: {
    width: WIDTH_DEVICE / 1.5,
    height: 16,
    borderRadius: 8,
  },
  price: {
    width: 120,
    height: 16,
    borderRadius: 8,
    marginTop: 6,
  },
});
