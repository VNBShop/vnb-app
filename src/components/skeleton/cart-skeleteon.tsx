/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BottomSafeArea from '../../UIkit/layouts/bottom-safe-area';
import {color} from '../../UIkit/palette';

export default function CartSkeleton() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.locationContainer}>
          <SkeletonPlaceholder>
            <View
              style={{
                width: 180,
                height: 16,
                borderRadius: 9999,
              }}
            />
          </SkeletonPlaceholder>
        </View>

        <View style={styles.cartContainer}>
          {Array.from({length: 5}).map((_, index) => (
            <View key={index}>
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
                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 80,
                        height: 16,
                        borderRadius: 9999,
                      }}
                    />
                  </SkeletonPlaceholder>
                  <View style={styles.productFooter}>
                    <SkeletonPlaceholder>
                      <View
                        style={{
                          width: 90,
                          height: 35,
                          borderRadius: 8,
                        }}
                      />
                    </SkeletonPlaceholder>

                    <SkeletonPlaceholder>
                      <View
                        style={{
                          width: 50,
                          height: 16,
                          borderRadius: 9999,
                        }}
                      />
                    </SkeletonPlaceholder>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <BottomSafeArea />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  locationContainerLeft: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  location: {
    color: color.gray,
  },
  cartContainer: {
    marginTop: 32,
    gap: 16,
  },
  productItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productImg: {
    width: 100,
    height: 100,
    objectFit: 'contain',
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginTop: 6,
    rowGap: 8,
  },
  productName: {
    color: color.gray,
  },
  productPrice: {
    fontWeight: '500',
    fontSize: 16,
  },
  priceDedre: {
    fontWeight: '500',
    color: color.secondary,
  },
  actionHandle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: color.border_input,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  actionHandleBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textAction: {
    fontSize: 22,
    color: color.gray,
  },
  left: {
    borderRightWidth: 0.3,
    borderColor: color.border_input,
  },
  right: {
    borderLeftWidth: 0.3,
    borderColor: color.border_input,
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
