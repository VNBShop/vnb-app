import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {OrderedStatus} from '../../types/order';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import {color} from '../UIkit/palette';
import {common, flex} from '../UIkit/styles';
import {pen, xmark} from '../assets';
import useCreateCart, {CreateCartPayload} from '../hooks/cart/useCreateCart';
import useFetchOrdered from '../hooks/order/useFetchOrdered';
import {colorsOrderedStatus, orderedStatusOption} from '../libs/contants';
import Empty from './404';
import OrderedSkeleton from './skeleton/ordered-skeleton';
import Box from './ui/box';
import HrVertical from './ui/hrVertical';
import {Icon} from './ui/icon';
import OrHr from './ui/or-hr';
import Tag from './ui/tag';

type IProps = Partial<NativeStackScreenProps<RootStackProps, 'Ordered'>> & {
  status?: OrderedStatus;
};

export default function AllOrder({navigation, status}: IProps) {
  const insets = useSafeAreaInsets();
  const {
    orders,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isRefetching,
    isPending,
    refetch,
  } = useFetchOrdered({
    filter: {
      ...(status
        ? {
            status: status,
          }
        : {}),
    },
  });

  const [errs, setErrs] = React.useState<string[]>([]);

  const popupErr = React.useRef<Modalize>();

  const onClosePopup = () => {
    !!popupErr?.current && popupErr?.current?.close();
  };

  const {loading, onAddToCart} = useCreateCart({
    isMultiple: true,
    navigation: navigation as any,
    onErr(messages) {
      setErrs(messages);
      !!popupErr?.current && popupErr.current?.open();
    },
  });

  const onReDeem = (carts: CreateCartPayload[]) => {
    if (!carts?.length) {
      Toast.show({
        text2: 'Your cart is empty!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });

      return;
    }
    onAddToCart(carts);
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          renderItem={({item}) => (
            <View style={styles.orderItem}>
              <Tag
                content={
                  orderedStatusOption.find(o => o?.value === item?.orderStatus)
                    ?.label ?? ''
                }
                textColor={colorsOrderedStatus[item?.orderStatus]?.color}
                backGroundColor={
                  colorsOrderedStatus[item?.orderStatus]?.backgroundColor
                }
              />
              {item?.products?.map(prod => {
                return (
                  <View key={prod?.productId}>
                    <View style={styles.productItem}>
                      <Image
                        source={{
                          uri: prod?.productImage ?? '',
                        }}
                        style={styles.productImg}
                      />

                      <View style={styles.productInfo}>
                        <Text>{prod?.productName}</Text>

                        <View style={styles.productPrice}>
                          {!!prod?.productSizeName && (
                            <View style={styles.tag}>
                              <Text style={styles.tagText}>
                                {prod.productSizeName}
                              </Text>
                            </View>
                          )}
                          <HrVertical />
                          <Text style={common.text_gray}>
                            x{prod?.quantity}
                          </Text>
                        </View>

                        <View style={flex.between}>
                          <Text style={common.text_secondary}>
                            {prod?.priceUnit?.toLocaleString('vi-VI', {
                              currency: 'VND',
                              style: 'currency',
                            })}
                          </Text>
                          {item?.orderStatus === 'SUCCESS' && (
                            <TouchableOpacity style={styles.editContainer}>
                              <Icon size={20} icon={pen} />
                              <Text style={common.text_link}>Review</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>

                    {item?.orderStatus === 'SUCCESS' && <OrHr />}
                  </View>
                );
              })}

              {item?.orderStatus === 'SUCCESS' && (
                <View style={styles.orderFooter}>
                  {/* <TouchableOpacity style={styles.footerBtn}>
                        <Text>View detail</Text>
                      </TouchableOpacity> */}
                  <Box />

                  <TouchableOpacity
                    onPress={() => {
                      const payload: CreateCartPayload[] = item?.products?.map(
                        p => ({
                          productSizeId: p?.productSizeId,
                          quantity: p?.quantity,
                        }),
                      );

                      onReDeem(payload);
                    }}
                    disabled={loading}
                    style={[styles.footerBtn, styles.btnR]}>
                    {loading && <ActivityIndicator />}
                    <Text style={styles.textBtnR}>Redeem</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          data={orders}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={item => item?.orderId?.toLocaleString()}
          ListFooterComponent={
            <>
              {(isFetchingNextPage || isPending) && <OrderedSkeleton />}

              {isError &&
              !isPending &&
              !isFetchingNextPage &&
              !orders?.length ? (
                <Empty message="Your ordered is empty" />
              ) : null}
            </>
          }
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </View>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={false}
          adjustToContentHeight
          onClose={() => {
            setErrs([]);
          }}
          // modalHeight={270}
          ref={popupErr}
          HeaderComponent={
            <View style={styles.headerPopup}>
              <Text style={styles.headerTitle}>Your cart is out of stock</Text>

              <Icon onPress={onClosePopup} size={22} icon={xmark} />
            </View>
          }>
          <>
            <View style={styles.popupContent}>
              {errs?.map((item, index) => (
                <Text key={index}>- {item}</Text>
              ))}
            </View>
            <BottomSafeArea />
          </>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  popupContent: {
    rowGap: 4,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: color.gray,
  },
  headerPopup: {
    padding: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#e1e5fe',
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 12,
  },
  tagText: {
    color: '#4033a0',
  },
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  scrollContainer: {
    gap: 16,
  },
  orderItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 16,
    marginBottom: 16,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  footerBtn: {
    // flexGrow: 1,
    padding: 20,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  btnR: {
    backgroundColor: color.primary,
  },
  textBtnR: {
    color: '#ffffff',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 16,
  },
  productInfo: {
    gap: 8,
    flex: 1,
  },
  productImg: {
    width: 100,
    height: 100,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  end: {
    alignSelf: 'center',
    paddingVertical: 32,
    color: color.gray,
  },
});
