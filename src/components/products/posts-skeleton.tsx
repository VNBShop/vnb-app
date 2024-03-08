/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {WIDTH_DEVICE} from '../../UIkit/styles';

export default function PostsSkeleton() {
  return Array.from({length: 1}).map((_, index) => (
    <View style={styles.container} key={index}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
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
            <Text
              style={{
                width: 80,
                height: 16,
                borderRadius: 9999,
              }}>
              Dzung
            </Text>
          </SkeletonPlaceholder>
        </View>

        <SkeletonPlaceholder>
          <Text
            style={{
              width: 20,
              height: 16,
              borderRadius: 9999,
            }}>
            Dzung
          </Text>
        </SkeletonPlaceholder>
      </View>

      <SkeletonPlaceholder>
        <Text
          style={{
            width: 90,
            height: 16,
            borderRadius: 9999,
            marginLeft: 16,
            marginTop: 8,
          }}>
          Dzung
        </Text>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <Text
          style={{
            width: 180,
            height: 16,
            borderRadius: 9999,
            marginLeft: 16,
            marginTop: 8,
          }}>
          Dzung
        </Text>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <Text
          style={{
            width: 120,
            height: 16,
            borderRadius: 9999,
            marginLeft: 16,
            marginTop: 8,
          }}>
          Dzung
        </Text>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <View
          style={{
            width: WIDTH_DEVICE - 32,
            height: 300,
            marginTop: 16,
            borderRadius: 6,
            marginHorizontal: 16,
          }}
        />
      </SkeletonPlaceholder>

      <View style={styles.action}>
        <SkeletonPlaceholder>
          <View style={{width: 20, height: 16, borderRadius: 9999}} />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder>
          <View style={{width: 20, height: 16, borderRadius: 9999}} />
        </SkeletonPlaceholder>
      </View>

      <SkeletonPlaceholder>
        <View
          style={{width: 70, height: 16, borderRadius: 9999, marginLeft: 16}}
        />
      </SkeletonPlaceholder>
    </View>
  ));
}

const styles = StyleSheet.create({
  commentHeader: {
    paddingVertical: 32,
  },
  commentTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    paddingVertical: 16,
  },
  username: {
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});
