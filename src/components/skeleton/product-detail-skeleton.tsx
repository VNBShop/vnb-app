/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {WIDTH_DEVICE, spec} from '../../UIkit/styles';
import OrHr from '../ui/or-hr';

export default function ProductDetailSkeleton() {
  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={spec.space_horizontal}>
          <SkeletonPlaceholder>
            <View style={styles.imageContainer} />
          </SkeletonPlaceholder>

          <View style={styles.productInfoContainer}>
            <SkeletonPlaceholder>
              <View style={styles.tag} />
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <Text
                style={{
                  width: WIDTH_DEVICE / 1.5,
                  height: 25,
                  borderRadius: 9999,
                }}
              />
            </SkeletonPlaceholder>

            <View style={styles.priceContainer}>
              <SkeletonPlaceholder>
                <Text
                  style={{
                    width: 140,
                    height: 20,
                    borderRadius: 9999,
                  }}
                />
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <Text
                  style={{
                    width: 70,
                    height: 20,
                    borderRadius: 9999,
                  }}
                />
              </SkeletonPlaceholder>
            </View>

            <View style={styles.footer}>
              <SkeletonPlaceholder>
                <View
                  style={{
                    width: 120,
                    height: 20,
                    borderRadius: 9999,
                  }}
                />
              </SkeletonPlaceholder>
              <View style={styles.footerAction}>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                    }}
                  />
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                    }}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
          </View>

          <View>
            <SkeletonPlaceholder>
              <View
                style={{
                  width: 70,
                  height: 16,
                  borderRadius: 9999,
                }}
              />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View
                style={{
                  width: 90,
                  height: 16,
                  borderRadius: 9999,
                  marginTop: 8,
                }}
              />
            </SkeletonPlaceholder>
          </View>

          <OrHr marginVertical={24} />

          <View>
            <SkeletonPlaceholder>
              <View
                style={{
                  width: 60,
                  height: 16,
                  borderRadius: 9999,
                  marginTop: 8,
                }}
              />
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                  alignItems: 'flex-start',
                  gap: 12,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    height: 100,
                    borderRadius: 8,
                  }}
                />
              </View>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                  alignItems: 'flex-start',
                  gap: 12,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    height: 100,
                    borderRadius: 8,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginTop: 16,
    borderRadius: 8,
  },

  productInfoContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  tag: {
    width: 50,
    marginBottom: 8,
    height: 20,
    borderRadius: 9999,
  },
  priceContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerAction: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
