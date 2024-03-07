/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SafeArea from '../../UIkit/layouts/safe-area';
import {color} from '../../UIkit/palette';
import HrVertical from '../ui/hrVertical';
import OrHr from '../ui/or-hr';

export default function CheckoutSkeleton() {
  return (
    <SafeArea>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.locationContainer}>
            <View>
              <View style={styles.locationContainerLeft}>
                <View style={styles.contactInfo}>
                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 150,
                        height: 16,
                        borderRadius: 9999,
                      }}
                    />
                  </SkeletonPlaceholder>
                  <HrVertical />
                  <SkeletonPlaceholder>
                    <Text
                      style={{
                        width: 100,
                        height: 16,
                        borderRadius: 9999,
                      }}>
                      0911710010
                    </Text>
                  </SkeletonPlaceholder>
                </View>
              </View>
              <SkeletonPlaceholder>
                <Text
                  style={{
                    width: 300,
                    height: 16,
                    borderRadius: 9999,
                  }}>
                  172 Nguyen Thi Thap, 7 District, Ho Chi Minh
                </Text>
              </SkeletonPlaceholder>
            </View>
          </View>

          <View style={styles.cartContainer}>
            {Array.from({length: 3}).map((item, index) => {
              return (
                index < 3 && (
                  <View key={index}>
                    <View style={styles.productItem}>
                      <SkeletonPlaceholder>
                        <View style={styles.productImg} />
                      </SkeletonPlaceholder>
                      <View style={styles.productInfo}>
                        <SkeletonPlaceholder>
                          <Text
                            style={{
                              width: 150,
                              height: 16,
                              borderRadius: 9999,
                            }}
                          />
                        </SkeletonPlaceholder>
                        <Text>
                          <SkeletonPlaceholder>
                            <Text
                              style={{
                                width: 60,
                                height: 16,
                                borderRadius: 9999,
                              }}
                            />
                          </SkeletonPlaceholder>
                        </Text>

                        <View style={styles.productFooter}>
                          <SkeletonPlaceholder>
                            <View
                              style={{
                                width: 120,
                                height: 35,
                                borderRadius: 8,
                              }}
                            />
                          </SkeletonPlaceholder>

                          <SkeletonPlaceholder>
                            <Text
                              style={{
                                width: 50,
                                height: 14,
                                borderRadius: 8,
                              }}>
                              Delete
                            </Text>
                          </SkeletonPlaceholder>
                        </View>
                      </View>
                    </View>

                    <OrHr />
                  </View>
                )
              );
            })}
          </View>

          <View style={styles.paymentMethod}>
            <SkeletonPlaceholder>
              <Text
                style={{
                  width: 130,
                  height: 16,
                  borderRadius: 8,
                }}>
                Payment method
              </Text>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <View
                style={{width: 120, height: 50, borderRadius: 8, marginTop: 12}}
              />
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerAction}>
          <View style={styles.footerActionInline}>
            <SkeletonPlaceholder>
              <Text style={{width: 70, height: 16, borderRadius: 9999}}>
                Voucher
              </Text>
            </SkeletonPlaceholder>
          </View>

          <SkeletonPlaceholder>
            <Text style={{width: 150, height: 16, borderRadius: 9999}}>
              Voucher
            </Text>
          </SkeletonPlaceholder>
        </View>

        <OrHr />

        <View style={styles.footerAction}>
          <SkeletonPlaceholder>
            <Text style={{width: 40, height: 16, borderRadius: 9999}}>
              Voucher
            </Text>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <Text style={{width: 130, height: 40, borderRadius: 8}}>
              Voucher
            </Text>
          </SkeletonPlaceholder>
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  locationContainerLeft: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
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
  },
  productInfo: {
    flex: 1,
    marginTop: 6,
    rowGap: 8,
  },

  productFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  footer: {
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 16,
    borderTopColor: color.border_input,
    borderTopWidth: 0.5,
    gap: 12,
  },
  footerAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerActionInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  paymentMethod: {
    marginVertical: 32,
  },
});
