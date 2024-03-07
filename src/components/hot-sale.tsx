/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {BottomTabProps, RootStackProps} from '../../types/route';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import useFetchProduct from '../hooks/product/useFetchProducts';

export default function HotSale() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();

  const bottomNav =
    useNavigation<NativeStackNavigationProp<BottomTabProps, 'Home'>>();

  const {products, isError, isPending} = useFetchProduct({
    currentPage: 1,
    pageSize: 7,
  });

  if (isError) {
    return;
  }

  if (isPending) {
    return (
      <View style={{marginTop: 32, paddingHorizontal: 16}}>
        <Text style={styles.title}>Hot sales</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productContainer}>
          {Array.from('123456').map((_, index) => (
            <View key={index} style={styles.item}>
              <View>
                <SkeletonPlaceholder>
                  <View style={styles.image} />
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: '90%',
                      height: 16,
                      marginTop: 8,
                      borderRadius: 9999,
                    }}
                  />
                </SkeletonPlaceholder>

                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: '40%',
                      height: 16,
                      marginTop: 8,
                      borderRadius: 9999,
                    }}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[spec.space_horizontal, styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Hot sales</Text>
        <TouchableOpacity>
          <Text
            style={common.text_link}
            onPress={() => bottomNav.navigate('Product')}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productContainer}>
        {products?.length
          ? products.map(item => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    productId: item.productId,
                  })
                }
                key={item.productId}
                style={styles.item}>
                <View>
                  <Image
                    source={{uri: item.productImages[0]}}
                    style={styles.image}
                  />
                  <Text style={common.text_gray}>{item.productName}</Text>
                </View>
                <Text style={styles.price}>
                  {item?.productPrice?.toLocaleString('vi-VI', {
                    currency: 'VND',
                    style: 'currency',
                  })}
                </Text>

                <View style={styles.sale}>
                  <Text style={styles.textSale}>-35%</Text>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  productContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  item: {
    width: 140,
    justifyContent: 'space-between',
    position: 'relative',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 140,
    objectFit: 'contain',
    borderRadius: 8,
    marginBottom: 8,
  },
  price: {
    color: color.secondary,
    marginTop: 8,
  },
  sale: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: color.secondaryPastel,
    padding: 4,
    borderRadius: 99999,
  },
  textSale: {
    color: color.secondary,
    fontWeight: '500',
    fontSize: 12,
  },
});
