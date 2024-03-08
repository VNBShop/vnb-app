/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../UIkit/palette';
import {flex} from '../../UIkit/styles';

export default function ProfileSkeleton() {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userHead}>
        <View style={styles.avt}>
          <SkeletonPlaceholder>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 9999,
              }}
            />
          </SkeletonPlaceholder>
        </View>

        <View style={styles.flow}>
          <View style={styles.flowItem}>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 25,
                  height: 16,
                  borderRadius: 9999,
                }}>
                0
              </Text>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 50,
                  height: 16,
                  borderRadius: 9999,
                }}>
                Posts
              </Text>
            </SkeletonPlaceholder>
          </View>

          <View style={styles.flowItem}>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 25,
                  height: 16,
                  borderRadius: 9999,
                }}>
                0
              </Text>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 50,
                  height: 16,
                  borderRadius: 9999,
                }}>
                Posts
              </Text>
            </SkeletonPlaceholder>
          </View>

          <View style={styles.flowItem}>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 25,
                  height: 16,
                  borderRadius: 9999,
                }}>
                0
              </Text>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 50,
                  height: 16,
                  borderRadius: 9999,
                }}>
                Posts
              </Text>
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={flex.between}>
          <SkeletonPlaceholder>
            <Text
              style={{
                width: 50,
                height: 16,
                borderRadius: 999,
              }}
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <Text
              style={{
                width: 80,
                height: 16,
                borderRadius: 999,
              }}
            />
          </SkeletonPlaceholder>
        </View>
        <SkeletonPlaceholder>
          <Text
            style={{
              width: 100,
              height: 16,
              borderRadius: 999,
              marginTop: 8,
            }}
          />
        </SkeletonPlaceholder>
      </View>

      <View style={styles.userAction}>
        <SkeletonPlaceholder>
          <Text
            style={{
              width: 160,
              height: 40,
              borderRadius: 8,
            }}
          />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  userHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  avt: {
    position: 'relative',
  },
  avtActionWrap: {
    padding: 3,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: 999,
  },
  avtAction: {
    width: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.link,
    borderRadius: 9999,
  },
  avtActionText: {
    fontSize: 18,
    fontWeight: '500',
    color: color.white,
  },
  flow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  flowItem: {
    alignItems: 'center',
    gap: 6,
  },
  flowItemW: {
    fontWeight: '500',
  },
  infoContainer: {
    marginVertical: 16,
    marginTop: 8,
  },
  infoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionBtn: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
  },
  actionText: {
    fontWeight: '500',
  },
  userContent: {
    marginTop: 16,
    gap: 32,
  },
  commentHeader: {
    paddingVertical: 32,
  },
  commentTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
