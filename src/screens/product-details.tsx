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
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import {getProductDetail} from '../api/public/product';
import {back, cartPlus, cart_gray, heartOutline, share} from '../assets';
import ProductDescription from '../components/product-description';
import ProductDetailSkeleton from '../components/skeleton/product-detail-skeleton';
import CommentProduct from '../components/ui/comment-card';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import Tag from '../components/ui/tag';
import {notFoundLottie} from '../lottie';
import {RootStackProps} from '../../types/route';

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

        <TouchableOpacity
          disabled={!isLoading || !isPending}
          onPress={() => navigation.navigate('Cart')}>
          <Icon size={25} icon={cart_gray} />
        </TouchableOpacity>
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
                  content="Authentic"
                  textColor={'#2e9e88'}
                  backGroundColor={'#d3f4ea'}
                />
              </View>
              <Text style={common.text_base}>{data?.productName}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {data?.productPrice
                    ? data.productPrice.toLocaleString('en-EN', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : null}
                </Text>
                <Text style={styles.sale}>-15%</Text>
              </View>

              <View style={styles.footer}>
                <AirbnbRating isDisabled showRating={false} size={18} />
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

            {data?.productComments?.length ? (
              <View>
                <Text style={common.text_base}>Product reviews</Text>
                <CommentProduct comments={data.productComments} />
              </View>
            ) : null}
          </ScrollView>
        </View>
      ) : null}

      <View style={styles.action}>
        <TouchableOpacity>
          <Icon size={30} icon={cartPlus} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.buyText}>Buying now</Text>
        </TouchableOpacity>
      </View>

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
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 8,
  },
  buyBtn: {
    width: 120,
    paddingVertical: 10,
    backgroundColor: color.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
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
