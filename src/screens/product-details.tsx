/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {AirbnbRating} from 'react-native-ratings';
import {ProductDetail} from '../../types/product';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import useAuth from '../_store/useAuth';
import {axiosProduct} from '../api/axios/axios-product';
import {back, heart, messenger} from '../assets';
import Empty from '../components/404';
import CartButton from '../components/cart-button';
import CommentProductCard from '../components/comment/comment-product-card';
import ProductDescription from '../components/product-description';
import ProductDetailAction from '../components/products/product-detail-action';
import ProductDetailSkeleton from '../components/skeleton/product-detail-skeleton';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import Tag from '../components/ui/tag';
import useCreateProductCmt, {
  CreateProductCmtPayload,
} from '../hooks/product/useCreateCommentProduct';
import useFetchProductComments from '../hooks/product/useFetchProductComments';

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

  const form = useForm<{
    comment: string;
  }>({
    defaultValues: {
      comment: '',
    },
  });
  const {data: user} = useAuth();

  const {data, isError, isLoading, isPending, refetch} =
    useQuery<ProductDetail>({
      queryKey: ['product', productId],
      queryFn: async ({queryKey}) => {
        const res = await axiosProduct.get(`/products/${queryKey[1]}`, {
          headers: {
            Authorization: user?.accessToken
              ? `Bearer ${user?.accessToken}`
              : null,
          },
        });

        if (res?.data?.success) {
          return res?.data?.metadata as ProductDetail;
        } else {
          throw new Error('');
        }
      },
      enabled: !!productId,
      refetchOnWindowFocus: true,
    });

  const {
    comments,
    hasNextPage,
    isLoading: loadingComments,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchProductComments({
    productId: data?.productId as number,
  });

  const {loading, onCreateCmt} = useCreateProductCmt({
    onSuccess: () => {},
  });

  const onSubmit = ({comment}: {comment: string}) => {
    console.log('comment', comment);

    if (!comment || !data?.productId) {
      return;
    }

    const payload: CreateProductCmtPayload = {
      comment,
      productId: data?.productId as number,
    };

    onCreateCmt(payload);
  };

  if (isError) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notFoundContainer}>
        <View style={[styles.header]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon size={25} icon={back} />
          </TouchableOpacity>

          <CartButton />
        </View>
        <Empty message="Product not found!" />
      </ScrollView>
    );
  }

  return (
    <KeyboardShift>
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
                    backGroundColor={
                      data?.productStatus ? '#e9f5d2' : '#ffe0e6'
                    }
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
                  {/* <Text style={styles.sale}>-15%</Text> */}
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
                    {/* <TouchableOpacity>
                      <Icon size={28} icon={share} />
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                      <Icon size={25} icon={heart} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {Object.keys(data?.productDetail).length ? (
                <ProductDescription content={data.productDetail} />
              ) : null}
              <OrHr marginVertical={24} />

              {data?.canComment && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 16,
                    alignItems: 'center',
                  }}>
                  <Controller
                    control={form.control}
                    name="comment"
                    render={({field: {onChange, value}}) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        style={{
                          paddingHorizontal: 16,
                          height: 40,
                          flex: 1,
                          backgroundColor: color.divider,
                          borderRadius: 9999,
                        }}
                        placeholder="Comment to rating this product"
                      />
                    )}
                  />

                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Icon
                      icon={messenger}
                      onPress={() => form.handleSubmit(onSubmit)()}
                      size={25}
                    />
                  )}
                </View>
              )}

              {!!comments?.length &&
                comments.map(cmt => (
                  <CommentProductCard
                    productId={data?.productId}
                    comment={cmt}
                    key={cmt?.commentId}
                  />
                ))}

              {!comments?.length && (loadingComments || isFetchingNextPage) && (
                <View>
                  <ActivityIndicator />
                </View>
              )}

              {!loadingComments && !isFetchingNextPage && !comments?.length && (
                <Text
                  style={[
                    common.text_gray,
                    {
                      textAlign: 'center',
                      marginTop: 20,
                    },
                  ]}>
                  Product has no comment yet
                </Text>
              )}

              {hasNextPage && !loadingComments && !isFetchingNextPage && (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => fetchNextPage()}>
                    <Text style={common.text_link}>Load more...</Text>
                  </TouchableOpacity>
                </View>
              )}

              <BottomSafeArea />
            </ScrollView>
          </View>
        ) : null}

        {isLoading ? <ProductDetailSkeleton /> : null}

        <ProductDetailAction
          navigation={navigation}
          product={data as ProductDetail}
        />
      </SafeArea>
    </KeyboardShift>
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
