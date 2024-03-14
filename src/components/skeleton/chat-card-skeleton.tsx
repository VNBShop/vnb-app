/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function ChatCardSkeleton() {
  return Array.from({length: 8}).map((_, index) => (
    <View
      key={index}
      style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
      <SkeletonPlaceholder>
        <View style={{height: 55, width: 55, borderRadius: 9999}} />
      </SkeletonPlaceholder>
      <View style={{flex: 1, gap: 4}}>
        <SkeletonPlaceholder>
          <View style={{height: 16, width: 100, borderRadius: 9999}} />
        </SkeletonPlaceholder>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <SkeletonPlaceholder>
            <View style={{height: 16, width: 230, borderRadius: 9999}} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{width: 10, height: 10, borderRadius: 9999}} />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  ));
}
