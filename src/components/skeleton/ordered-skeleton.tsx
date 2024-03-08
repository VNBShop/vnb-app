/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../UIkit/palette';
import {flex} from '../../UIkit/styles';
import HrVertical from '../ui/hrVertical';
import OrHr from '../ui/or-hr';

export default function OrderedSkeleton() {
  return Array.from({length: 2}).map((_, index) => (
    <View style={styles.orderItem} key={index}>
      <SkeletonPlaceholder>
        <View
          style={{
            width: 70,
            height: 20,
            borderRadius: 9999,
          }}
        />
      </SkeletonPlaceholder>
      {Array.from({length: 2}).map((__, key) => {
        return (
          <View key={key}>
            <View style={styles.productItem}>
              <SkeletonPlaceholder>
                <View style={styles.productImg} />
              </SkeletonPlaceholder>

              <View style={styles.productInfo}>
                <SkeletonPlaceholder>
                  <Text
                    style={{
                      width: 130,
                      height: 16,
                      borderRadius: 9999,
                    }}
                  />
                </SkeletonPlaceholder>

                <View style={styles.productPrice}>
                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 80,
                        height: 16,
                        borderRadius: 9999,
                      }}
                    />
                  </SkeletonPlaceholder>

                  <HrVertical />
                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 60,
                        height: 16,
                        borderRadius: 9999,
                      }}
                    />
                  </SkeletonPlaceholder>
                </View>

                <View style={flex.between}>
                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 40,
                        height: 16,
                        borderRadius: 9999,
                      }}
                    />
                  </SkeletonPlaceholder>

                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 80,
                        height: 35,
                        borderRadius: 8,
                      }}
                    />
                  </SkeletonPlaceholder>
                </View>
              </View>
            </View>

            <OrHr />
          </View>
        );
      })}
    </View>
  ));
}

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 16,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  footerBtn: {
    flexGrow: 1,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnR: {
    backgroundColor: color.primary,
  },
  textBtnR: {
    color: '#ffffff',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingBottom: 16,
  },
  productInfo: {
    gap: 8,
    flex: 1,
  },
  productImg: {
    width: 70,
    height: 70,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
