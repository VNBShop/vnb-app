/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function ChatSkeleton() {
  return (
    <View style={{marginTop: 40, width: '100%'}}>
      <View style={{gap: 2}}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: 60,
              height: 30,
              borderRadius: 18,
              borderBottomLeftRadius: 4,
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View
            style={{
              width: 170,
              height: 70,
              borderRadius: 18,
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View
            style={{
              width: 120,
              height: 30,
              borderRadius: 18,
              borderTopLeftRadius: 4,
            }}
          />
        </SkeletonPlaceholder>
      </View>

      <View style={{gap: 2, alignSelf: 'flex-end'}}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: 140,
              height: 30,
              borderRadius: 18,
              borderBottomRightRadius: 4,
              alignSelf: 'flex-end',
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View
            style={{
              width: 180,
              height: 90,
              borderRadius: 18,
              borderBottomRightRadius: 4,
              borderTopRightRadius: 4,
              alignSelf: 'flex-end',
            }}
          />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder>
          <View
            style={{
              width: 140,
              height: 90,
              borderRadius: 18,
              borderBottomRightRadius: 4,
              borderTopRightRadius: 4,
              alignSelf: 'flex-end',
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View
            style={{
              width: 40,
              height: 30,
              borderRadius: 18,
              borderTopRightRadius: 4,
              alignSelf: 'flex-end',
            }}
          />
        </SkeletonPlaceholder>
      </View>

      <SkeletonPlaceholder>
        <View
          style={{
            width: 170,
            height: 70,
            borderRadius: 18,
            borderBottomLeftRadius: 4,
          }}
        />
      </SkeletonPlaceholder>
    </View>
  );
}
