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
import {common} from '../UIkit/styles';
import {back, forwardGray, location} from '../assets';
import {color} from '../UIkit/palette';
import {fakeData} from '../libs/contants';
import OrHr from '../components/ui/or-hr';
import {Icon} from '../components/ui/icon';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../../types/route';

type CartScreenProps = NativeStackScreenProps<RootStackProps, 'Cart'>;

export default function CartScreen({navigation}: CartScreenProps) {
  return (
    <SafeArea>
      <View style={styles.header}>
        <TouchableOpacity
          style={common.positionLeftBase}
          onPress={() => navigation.goBack()}>
          <Icon size={25} icon={back} />
        </TouchableOpacity>

        <Text style={common.headerTitle}>Cart</Text>
      </View>

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.locationContainer}>
            <View style={styles.locationContainerLeft}>
              <Icon size={20} icon={location} />
              <Text style={styles.location}>
                172 Nguyen Thi Thap, 7 District, Ho Chi Minh
              </Text>
            </View>

            <Icon size={20} icon={forwardGray} />
          </View>

          <View style={styles.cartContainer}>
            {fakeData.map(item => (
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

                {fakeData[fakeData.length - 1] !== item && <OrHr />}
              </View>
            ))}
          </View>

          <BottomSafeArea />
        </ScrollView>
      </View>

      <View style={styles.footer}>
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
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
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
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
