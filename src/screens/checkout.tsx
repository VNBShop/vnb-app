import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common, flex} from '../UIkit/styles';
import {back, forwardGray, location, voucher} from '../assets';
import HrVertical from '../components/ui/hrVertical';
import {Icon} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import RadioCard from '../components/ui/radio-card';
import {fakeData, paymentMethod} from '../utils/contants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../types/route';

type CheckoutScreenProps = NativeStackScreenProps<RootStackProps, 'Checkout'>;

export default function CheckoutScreen({navigation}: CheckoutScreenProps) {
  const [paymentM, setPaymentM] = React.useState(0);

  return (
    <SafeArea>
      <View style={styles.header}>
        <TouchableOpacity
          style={common.position_left}
          onPress={() => navigation.goBack()}>
          <Icon icon={back} size={25} />
        </TouchableOpacity>

        <Text style={common.headerTitle}>Checkout confirm</Text>
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.locationContainer}>
            <View>
              <View style={styles.locationContainerLeft}>
                <Icon icon={location} size={20} />

                <View style={styles.contactInfo}>
                  <Text>Minh Dzung</Text>
                  <HrVertical />
                  <Text>0911710010</Text>
                </View>
              </View>
              <Text style={styles.location}>
                172 Nguyen Thi Thap, 7 District, Ho Chi Minh
              </Text>
            </View>

            <Icon icon={forwardGray} size={20} />
          </View>

          <View style={styles.cartContainer}>
            {fakeData.map((item, index) => {
              return (
                index < 3 && (
                  <View key={item.id}>
                    <View style={styles.productItem}>
                      <Image source={item.image} style={styles.productImg} />
                      <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text>
                          <Text style={styles.productPrice}>
                            {item.price.toLocaleString()}
                          </Text>{' '}
                          <Text style={styles.priceDedre}>-15%</Text>
                        </Text>

                        <View style={styles.productFooter}>
                          <View style={styles.actionHandle}>
                            <TouchableOpacity
                              style={[styles.actionHandleBtn, styles.left]}>
                              <Text style={styles.textAction}>-</Text>
                            </TouchableOpacity>
                            <TextInput style={styles.actionHandleBtn} />
                            <TouchableOpacity
                              style={[styles.actionHandleBtn, styles.right]}>
                              <Text style={styles.textAction}>+</Text>
                            </TouchableOpacity>
                          </View>

                          <TouchableOpacity>
                            <Text style={[common.text_link]}>Delete</Text>
                          </TouchableOpacity>
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
            <Text style={styles.title}>Payment method</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.methodContainer}>
              {paymentMethod.map(payment => (
                <TouchableOpacity
                  onPress={() => setPaymentM(payment.id)}
                  key={payment.id}
                  style={[
                    styles.methodItem,
                    {
                      borderColor:
                        paymentM === payment.id ? color.link : color.gray,
                    },
                  ]}>
                  <RadioCard
                    isAcive={paymentM === payment.id ? true : false}
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
                  {Number(30000000).toLocaleString()}
                </Text>
              </View>

              <View style={flex.between}>
                <Text style={common.text_gray}>Shipping</Text>
                <Text style={common.text_gray}>
                  {Number(23000).toLocaleString()}
                </Text>
              </View>

              <View style={flex.between}>
                <Text style={common.text_gray}>Discount</Text>
                <Text style={common.text_success}>
                  -{Number(423000).toLocaleString()}
                </Text>
              </View>

              <OrHr />

              <View style={flex.between}>
                <Text style={styles.title}>Total</Text>
                <Text style={styles.title}>
                  {Number(29600000).toLocaleString()}
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

          <View style={styles.footerActionInline}>
            <Text style={common.text_gray}>Fill or choose voucher</Text>
            <Icon icon={forwardGray} size={20} />
          </View>
        </View>

        <OrHr />

        <View style={styles.footerAction}>
          <View>
            <Text style={common.text_gray}>Total</Text>
            <Text style={styles.total}>
              {fakeData
                .reduce((acc, curr) => acc + curr.price, 0)
                .toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('Ordered')}>
            <Text style={styles.checkoutText}>Order</Text>
          </TouchableOpacity>
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
