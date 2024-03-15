import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Cart} from '../../types/order';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common} from '../UIkit/styles';
import {back, cart, xmark} from '../assets';
import Empty from '../components/404';
import CartSkeleton from '../components/skeleton/cart-skeleteon';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import useCreateCart, {CreateCartPayload} from '../hooks/cart/useCreateCart';
import useDeleteCart from '../hooks/cart/useDeleteCart';
import useFetchCart from '../hooks/cart/useFetchCart';

type CartScreenProps = NativeStackScreenProps<RootStackProps, 'Cart'>;

export default function CartScreen({navigation}: CartScreenProps) {
  const {data, isPending, isError} = useFetchCart();
  const [carts, setCarts] = React.useState<Cart[]>([]);
  const insets = useSafeAreaInsets();

  const [errs, setErrs] = React.useState<string[]>([]);

  const popupErr = React.useRef<Modalize>();

  const {loading, onAddToCart} = useCreateCart({
    onSuccess: () => {},
    isMultiple: true,
    navigation: navigation,
    onErr(messages) {
      setErrs(messages);
      !!popupErr?.current && popupErr.current?.open();
    },
  });

  const {loadingDeleteCart, onDeleteCart, variables} = useDeleteCart();

  const onIncrease = (id: Cart['cartId']) => {
    setCarts(prev => {
      const findIndex = prev.findIndex(c => c?.cartId === id);

      if (findIndex !== -1) {
        const newCarts = [...prev];

        newCarts[findIndex] = {
          ...newCarts[findIndex],
          quantity: newCarts[findIndex]?.quantity + 1,
        };

        return newCarts;
      }
      return prev;
    });
  };

  const onDecrease = (id: Cart['cartId']) => {
    setCarts(prev => {
      const findIndex = prev.findIndex(c => c?.cartId === id);

      if (findIndex !== -1) {
        const newCarts = [...prev];

        newCarts[findIndex] = {
          ...newCarts[findIndex],
          quantity:
            newCarts[findIndex]?.quantity > 1
              ? newCarts[findIndex]?.quantity - 1
              : 1,
        };

        return newCarts;
      }
      return prev;
    });
  };

  const onTextChange = (value: string, id: Cart['cartId']) => {
    const convertValue = parseInt(value, 10);

    setCarts(prev => {
      const findIndex = prev.findIndex(c => c?.cartId === id);

      if (findIndex !== -1) {
        const newCarts = [...prev];

        newCarts[findIndex] = {
          ...newCarts[findIndex],
          quantity: convertValue ? convertValue : 1,
        };

        return newCarts;
      }
      return prev;
    });
  };

  const onSubmit = () => {
    const payload: CreateCartPayload[] = carts?.map(c => ({
      productSizeId: c?.productSizeId,
      quantity: c.quantity,
    }));

    if (!payload?.length) {
      Toast.show({
        text2: 'Your cart is empty!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });

      return;
    }

    onAddToCart(payload);
  };

  const onClosePopup = () => {
    setErrs([]);
    !!popupErr?.current && popupErr.current?.close();
  };

  React.useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(carts)) {
      if (data && data.length > 0) {
        setCarts(data);
      } else {
        setCarts([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <SafeArea>
        <View style={styles.header}>
          <TouchableOpacity style={common.positionLeftBase}>
            <Icon
              size={25}
              icon={back}
              onPress={() => {
                console.log('check');
                navigation.goBack();
              }}
            />
          </TouchableOpacity>

          <Text style={common.headerTitle}>Cart</Text>
        </View>

        {isPending && <CartSkeleton />}

        {!!carts?.length && !isPending && (
          <>
            <View style={styles.container}>
              <ScrollView>
                <View style={styles.locationContainer}>
                  <View style={styles.locationContainerLeft}>
                    <Icon size={20} icon={cart} />
                    <Text style={styles.location}>Let empty your cart now</Text>
                  </View>
                </View>

                <View style={styles.cartContainer}>
                  {carts.map(item => (
                    <View key={item?.cartId}>
                      <View style={styles.productItem}>
                        <Image
                          source={{
                            uri: item?.productImage,
                          }}
                          style={styles.productImg}
                        />
                        <View style={styles.productInfo}>
                          <Text style={styles.productName}>
                            {item?.productName}
                          </Text>
                          <Text>
                            <Text style={styles.productPrice}>
                              {item?.productPriceUnit?.toLocaleString('vi-VI', {
                                currency: 'VND',
                                style: 'currency',
                              })}
                            </Text>
                          </Text>

                          <View style={styles.productFooter}>
                            <View style={styles.actionHandle}>
                              <TouchableOpacity
                                style={[styles.actionHandleBtn]}
                                onPress={() => onDecrease(item?.cartId)}>
                                <Text style={styles.textAction}>-</Text>
                              </TouchableOpacity>
                              <TextInput
                                style={styles.actionInput}
                                keyboardType="numeric"
                                value={item?.quantity?.toString()}
                                onChangeText={value =>
                                  onTextChange(value, item?.cartId)
                                }
                              />
                              <TouchableOpacity
                                style={[styles.actionHandleBtn]}
                                onPress={() => onIncrease(item?.cartId)}>
                                <Text style={styles.textAction}>+</Text>
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                              disabled={loadingDeleteCart}
                              onPress={() =>
                                onDeleteCart({
                                  id: item?.cartId,
                                })
                              }>
                              {loadingDeleteCart &&
                              item?.cartId === variables?.id ? (
                                <ActivityIndicator key={item?.cartId} />
                              ) : (
                                <Text style={[common.text_link]}>Delete</Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      {carts[carts?.length - 1] !== item && <OrHr />}
                    </View>
                  ))}
                </View>

                <BottomSafeArea />
              </ScrollView>
            </View>

            <View style={styles.footer}>
              <View>
                <Text style={common.text_gray}>Temp total</Text>
                <Text style={styles.total}>
                  {carts
                    ?.reduce(
                      (acc, curr) =>
                        acc + curr?.quantity * curr?.productPriceUnit,
                      0,
                    )
                    ?.toLocaleString()}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutBtn}
                disabled={loading}
                onPress={onSubmit}>
                {loading && <ActivityIndicator />}
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {(isError || !carts?.length) && !isPending && (
          <Empty message="Your cart is empty" />
        )}
      </SafeArea>

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
              {errs.map((item, index) => (
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
  actionInput: {
    borderBottomColor: color.border_input,
    borderBottomWidth: 0.5,
    width: 40,
    paddingVertical: 6,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    marginTop: 8,
  },
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
  },
  productInfo: {
    flex: 1,
    marginTop: 6,
    rowGap: 8,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    color: color.secondary,
  },
  priceDedre: {
    fontWeight: '500',
    color: color.secondary,
  },
  actionHandle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    // borderWidth: 0.3,
    // borderColor: color.border_input,
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
    fontSize: 25,
    color: color.gray,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: color.border_input,
    borderTopWidth: 0.5,
  },
  total: {
    fontSize: 16,
    fontWeight: '500',
    color: color.secondary,
    marginTop: 4,
  },
  checkoutBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: color.primary,
    borderRadius: 6,
    flexDirection: 'row',
    gap: 8,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
