/* eslint-disable react-native/no-inline-styles */
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
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
import {z} from 'zod';
import {Voucher} from '../../types/order';
import {BottomTabProps, RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common, flex} from '../UIkit/styles';
import {back, forwardGray, location, voucher, xmark} from '../assets';
import CheckoutSkeleton from '../components/skeleton/checkout-skeleton';
import HrVertical from '../components/ui/hrVertical';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import RadioCard from '../components/ui/radio-card';
import useFetchCart from '../hooks/cart/useFetchCart';
import useAddVoucher from '../hooks/order/useAddVoucher';
import useCreateOrder, {
  CreateOrderPayload,
} from '../hooks/order/useCreateOrder';
import useFetchUser from '../hooks/user/useFetchUser';
import {paymentMethod} from '../libs/contants';

type CheckoutScreenProps = NativeStackScreenProps<RootStackProps, 'Checkout'>;

const VoucherSchema = z.object({
  voucherCode: z.string().min(1, {
    message: 'Please enter voucher code!',
  }),
});

type InputVoucher = z.infer<typeof VoucherSchema>;

export default function CheckoutScreen({navigation}: CheckoutScreenProps) {
  const form = useForm<InputVoucher>({
    resolver: zodResolver(VoucherSchema),
    defaultValues: {
      voucherCode: '',
    },
  });
  const [paymentM, setPaymentM] = React.useState('');
  const [voucherCode, setVoucherCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const insets = useSafeAreaInsets();
  const modal = React.useRef<Modalize>();

  const onCloseModal = () => {
    !!modal?.current && modal?.current?.close();
  };

  const bottomNav =
    useNavigation<NativeStackNavigationProp<BottomTabProps, 'Home'>>();

  const {data: carts, isPending: loadingCarts} = useFetchCart();
  const {user, isPending: loadingUser} = useFetchUser();

  const {loading, onCreateOrder} = useCreateOrder({
    onSuccess: () => {
      navigation.replace('Ordered', {
        tab: 0,
      });
    },
  });

  const onSubmit = () => {
    if (!carts?.length) {
      Alert.alert('Cart empty', 'Your cart is empty, let buying now!', [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          style: 'default',
          onPress: () => bottomNav.navigate('Product', {}),
          text: 'Shopping',
        },
      ]);

      return;
    }

    if (!paymentM) {
      Toast.show({
        type: 'error',
        text2: 'Please select payment method',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });
      return;
    }

    if (
      !user?.address ||
      !user?.phoneNumber ||
      (!user?.firstName && !user?.lastName)
    ) {
      Alert.alert('Information required', 'Update your information to order!', [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          style: 'default',
          onPress: () =>
            navigation.navigate('UpdateProfile', {
              user: user,
            }),
          text: 'Update',
        },
      ]);

      return;
    }

    const payload: CreateOrderPayload = {
      cartIds: carts?.map(cart => cart?.cartId),
      paymentType: paymentM as CreateOrderPayload['paymentType'],
      voucherCode: voucherCode,
    };

    onCreateOrder(payload);
  };

  const {loadingAddVoucher, onAddVoucher} = useAddVoucher({
    onSuccess: (
      payload: Pick<Voucher, 'maxDiscount' | 'voucherCode' | 'voucherPercent'>,
    ) => {
      const totalTemp =
        carts?.reduce(
          (acc, curr) => acc + curr?.quantity * curr?.productPriceUnit,
          0,
        ) ?? 0;
      const discountF = totalTemp * payload?.voucherPercent;
      const discountAmount =
        totalTemp -
        (discountF > payload?.maxDiscount ? payload?.maxDiscount : discountF);

      setDiscount(
        discountF > payload?.maxDiscount ? payload?.maxDiscount : discountF,
      );

      setTotal(discountAmount);
      setVoucherCode(payload?.voucherCode);

      Toast.show({
        type: 'success',
        text2: 'Add voucher successfully!',
        text2Style: {
          fontSize: 13,
        },
        topOffset: insets.top,
      });

      onCloseModal();
    },
  });

  const onSubmitAddVoucher = (values: InputVoucher) => {
    if (!values?.voucherCode) {
      return;
    }

    onAddVoucher({
      voucherCode: values?.voucherCode,
    });
  };

  React.useEffect(() => {
    if (carts?.length) {
      setTotal(
        carts?.reduce(
          (acc, curr) => acc + curr?.quantity * curr?.productPriceUnit,
          0,
        ),
      );
    }
  }, [carts]);

  return (
    <>
      <SafeArea>
        <View style={styles.header}>
          <TouchableOpacity
            style={common.positionLeftBase}
            onPress={() => navigation.goBack()}>
            <Icon icon={back} size={25} />
          </TouchableOpacity>

          <Text style={common.headerTitle}>Checkout confirm</Text>
        </View>

        {loadingCarts || loadingUser ? (
          <CheckoutSkeleton />
        ) : (
          <>
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.locationContainer}
                  onPress={() =>
                    navigation.navigate('UpdateProfile', {
                      user: user,
                    })
                  }>
                  <View>
                    <View style={styles.locationContainerLeft}>
                      <Icon icon={location} size={20} />

                      <View style={styles.contactInfo}>
                        <Text>
                          {user?.firstName || user?.lastName
                            ? `${user?.firstName} ${user?.lastName}`
                            : '-'}
                        </Text>
                        <HrVertical />
                        <Text>{user?.phoneNumber ?? '-'}</Text>
                      </View>
                    </View>
                    <Text style={styles.location}>{user?.address ?? '-'}</Text>
                  </View>

                  <Icon icon={forwardGray} size={20} />
                </TouchableOpacity>

                <View style={styles.cartContainer}>
                  {carts.map((cart, index) => {
                    return (
                      index < 3 && (
                        <View key={cart?.cartId}>
                          <View style={styles.productItem}>
                            <Image
                              source={{
                                uri: cart?.productImage ?? '',
                              }}
                              style={styles.productImg}
                            />
                            <View style={styles.productInfo}>
                              <Text style={styles.productName}>
                                {cart?.productName}
                              </Text>
                              <Text style={styles.productPrice}>
                                {cart?.productPriceUnit?.toLocaleString(
                                  'vi-VI',
                                  {
                                    currency: 'VND',
                                    style: 'currency',
                                  },
                                )}
                              </Text>
                              {!!cart?.productSizeName && (
                                <View style={styles.sizeTag}>
                                  <Text style={styles.sizeTagText}>
                                    {cart.productSizeName}
                                  </Text>
                                </View>
                              )}

                              <Text style={common.text_gray}>
                                Quantity: {cart?.quantity}
                              </Text>
                            </View>
                          </View>

                          <OrHr />
                        </View>
                      )
                    );
                  })}
                </View>

                <View style={styles.paymentMethod}>
                  <Text style={styles.title}>Payment method</Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.methodContainer}>
                    {paymentMethod.map(payment => (
                      <TouchableOpacity
                        onPress={() => setPaymentM(payment.value)}
                        key={payment.id}
                        style={[
                          styles.methodItem,
                          {
                            borderColor:
                              paymentM === payment.value
                                ? color.link
                                : color.gray,
                          },
                        ]}>
                        <RadioCard
                          isAcive={paymentM === payment.value ? true : false}
                          label={payment.label}
                          labelLogo={payment.logo}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View>
                  <Text style={styles.title}>Summary</Text>
                  <View style={styles.sumaryContainer}>
                    <View style={flex.between}>
                      <Text style={common.text_gray}>Temp</Text>
                      <Text style={common.text_gray}>
                        {carts
                          ?.reduce(
                            (acc, curr) =>
                              acc + curr?.quantity * curr?.productPriceUnit,
                            0,
                          )
                          ?.toLocaleString()}
                      </Text>
                    </View>

                    <View style={flex.between}>
                      <Text style={common.text_gray}>Shipping</Text>
                      <Text style={common.text_gray}>Free</Text>
                    </View>

                    <View style={flex.between}>
                      <Text style={common.text_gray}>Tax</Text>
                      <Text style={common.text_gray}>VAT</Text>
                    </View>

                    <View style={flex.between}>
                      <Text style={common.text_gray}>Discount</Text>
                      <Text style={common.text_success}>
                        {discount
                          ? `-${discount?.toLocaleString('vi-VI', {
                              currency: 'VND',
                              style: 'currency',
                            })}`
                          : '-'}
                      </Text>
                    </View>

                    <OrHr />

                    <View style={flex.between}>
                      <Text style={styles.title}>Total</Text>
                      <Text style={styles.title}>
                        {total?.toLocaleString('vi-VI', {
                          currency: 'VND',
                          style: 'currency',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View style={styles.footer}>
              <View style={styles.footerAction}>
                <View style={styles.footerActionInline}>
                  <Icon icon={voucher} size={20} />
                  <Text style={common.text_gray}>Voucher</Text>
                </View>

                <TouchableOpacity
                  disabled={loading}
                  onPress={() => !!modal?.current && modal?.current?.open()}>
                  <View style={styles.footerActionInline}>
                    <Text
                      style={
                        voucherCode ? common.text_secondary : common.text_gray
                      }>
                      {voucherCode ? voucherCode : 'Fill or choose voucher'}
                    </Text>
                    <Icon icon={forwardGray} size={20} />
                  </View>
                </TouchableOpacity>
              </View>

              <OrHr />

              <View style={styles.footerAction}>
                <View>
                  <Text style={common.text_gray}>Total</Text>
                  <Text style={styles.total}>
                    {total?.toLocaleString('vi-VI', {
                      currency: 'VND',
                      style: 'currency',
                    })}
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={loading}
                  style={styles.checkoutBtn}
                  onPress={onSubmit}>
                  {loading && <ActivityIndicator />}
                  <Text style={styles.checkoutText}>Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </SafeArea>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={false}
          adjustToContentHeight
          // modalHeight={270}
          ref={modal}
          HeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Add voucher
              </Text>

              <Icon onPress={onCloseModal} icon={xmark} size={20} />
            </View>
          }>
          <View style={{paddingHorizontal: 20}}>
            <Controller
              control={form.control}
              name="voucherCode"
              render={({field: {value, onChange}}) => (
                <>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter voucher"
                    placeholderTextColor={color.gray}
                    style={{
                      height: 40,
                      paddingHorizontal: 10,
                      borderWidth: 0.7,
                      borderRadius: 8,
                      borderColor: color.border_input,
                    }}
                  />

                  {!!form?.formState?.errors?.voucherCode?.message && (
                    <Text
                      style={{
                        color: color.danger,
                      }}>
                      {form?.formState?.errors?.voucherCode?.message}
                    </Text>
                  )}
                </>
              )}
            />

            <TouchableOpacity
              disabled={loadingAddVoucher}
              onPress={form.handleSubmit(onSubmitAddVoucher)}
              style={{
                height: 44,
                borderRadius: 8,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                flexDirection: 'row',
                gap: 8,
              }}>
              {loadingAddVoucher && <ActivityIndicator />}
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                Add
              </Text>
            </TouchableOpacity>

            <BottomSafeArea />
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  sizeTag: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e8fff7',
  },
  sizeTagText: {
    fontSize: 12,
    color: '#009171',
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
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  location: {
    color: color.gray,
    marginLeft: 4,
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
    columnGap: 16,
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
    alignItems: 'center',
    gap: 8,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
  },
  paymentMethod: {
    marginVertical: 32,
  },
  methodContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  methodItem: {
    padding: 16,
    borderWidth: 0.2,
    borderRadius: 6,
    width: WIDTH_DEVICE - 120,
  },
  sumaryContainer: {
    marginTop: 12,
    gap: 8,
    marginBottom: 32,
  },
});
