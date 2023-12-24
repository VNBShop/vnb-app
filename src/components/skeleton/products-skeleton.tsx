import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {WIDTH_DEVICE} from '../../UIkit/styles';

export default function ProductsSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        <View style={styles.item}>
          <View style={styles.img} />
          <View style={styles.name} />
          <View style={styles.price} />
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View style={styles.item}>
          <View style={styles.img} />
          <View style={styles.name} />
          <View style={styles.price} />
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View style={styles.item}>
          <View style={styles.img} />
          <View style={styles.name} />
          <View style={styles.price} />
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View style={styles.item}>
          <View style={styles.img} />
          <View style={styles.name} />
          <View style={styles.price} />
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View style={styles.item}>
          <View style={styles.img} />
          <View style={styles.name} />
          <View style={styles.price} />
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View style={styles.item}>
          <View style={styles.img} />
          <View style={styles.name} />
          <View style={styles.price} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    rowGap: 32,
    columnGap: 16,
    flexWrap: 'wrap',
  },
  item: {
    width: (WIDTH_DEVICE - 48) / 2,
    height: 'auto',
    gap: 8,
  },
  img: {
    width: '100%',
    height: WIDTH_DEVICE / 2 - 16,
    borderRadius: 8,
  },
  name: {
    width: WIDTH_DEVICE / 2 - 70,
    height: 16,
    borderRadius: 8,
  },
  price: {
    width: 70,
    height: 12,
    borderRadius: 8,
  },
});
