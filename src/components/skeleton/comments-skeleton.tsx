/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function CommentsSkeleton() {
  return Array.from({length: 3}).map((_, index) => (
    <View
      style={{
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
      }}
      key={index}>
      <SkeletonPlaceholder>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 9999,
          }}
        />
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View
          style={{
            width: 250,
            height: 70,
            borderRadius: 16,
          }}
        />
      </SkeletonPlaceholder>
    </View>
  ));
}
