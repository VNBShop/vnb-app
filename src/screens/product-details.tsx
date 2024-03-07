import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {ProductDetail} from '../../types/product';
import {RootStackProps} from '../../types/route';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import {getProductDetail} from '../api/public/product';
import {back, heartOutline, share} from '../assets';
import CartButton from '../components/cart-button';
import ProductDescription from '../components/product-description';
import ProductDetailAction from '../components/products/product-detail-action';
import ProductDetailSkeleton from '../components/skeleton/product-detail-skeleton';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import Tag from '../components/ui/tag';
import {notFoundLottie} from '../lottie';

type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ProductDetail'
>;

export default function ProductDetailScreen({
  navigation,
  route,
}: ProductDetailScreenProps) {
  const {
    params: {productId},
  } = route;

  const {data, isError, isLoading, isPending, refetch} =
    useQuery<ProductDetail>({
      queryKey: ['product', productId],
      queryFn: ({queryKey}) => getProductDetail(queryKey[1]),
      enabled: !!productId,
    });

  if (isError) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notFoundContainer}>
        <LottieView
          source={notFoundLottie}
          autoPlay
          loop
          style={styles.notFound}
        />
        <Text style={[common.text_base, common.text_gray]}>
          No thing to see!
        </Text>
      </ScrollView>
    );
  }

  return (
    <SafeArea>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={25} icon={back} />
        </TouchableOpacity>

        <CartButton />
      </View>

      {data ? (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={spec.space_horizontal}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: data?.productImages[0]}}
                style={styles.imageProduct}
              />
            </View>

            <View style={styles.productInfoContainer}>
              <View style={styles.tag}>
                <Tag
                  content={data?.productStatus ? 'In stock' : 'Out stock'}
                  textColor={data?.productStatus ? '#486d1e' : '#d70041'}
                  backGroundColor={data?.productStatus ? '#e9f5d2' : '#ffe0e6'}
                />
              </View>
              <Text style={common.text_base}>{data?.productName}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {data?.productPrice
                    ? data.productPrice.toLocaleString('vi-VI', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : null}
                </Text>
                <Text style={styles.sale}>-15%</Text>
              </View>

              <View style={styles.footer}>
                <AirbnbRating
                  count={5}
                  defaultRating={5}
                  isDisabled
                  showRating={false}
                  size={18}
                />
                <View style={styles.footerAction}>
                  <TouchableOpacity>
                    <Icon size={28} icon={share} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon size={25} icon={heartOutline} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {Object.keys(data?.productDetail).length ? (
              <ProductDescription content={data.productDetail} />
            ) : null}
            <OrHr marginVertical={24} />
          </ScrollView>
        </View>
      ) : null}

      <ProductDetailAction
        navigation={navigation}
        product={data as ProductDetail}
      />

      {isLoading ? <ProductDetailSkeleton /> : null}
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  imageProduct: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  productInfoContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
  },
  sale: {
    color: color.secondary,
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  notFound: {
    width: 200,
    height: 200,
  },
});
