import * as React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackProps} from '../../types/route';
import {Icon} from './ui/icon';
import {cart_gray} from '../assets';
import useFetchCart from '../hooks/cart/useFetchCart';
import {StyleSheet, Text, View} from 'react-native';
import {color} from '../UIkit/palette';

export default function CartButton() {
  const {data} = useFetchCart();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();
  return (
    <View style={styles.cartContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartContainer}>
        <Icon size={25} icon={cart_gray} />
      </TouchableOpacity>
      {!!data?.length && (
        <View style={styles.notify}>
          <Text style={styles.notiText}>{data.length}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notify: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary,
  },
  notiText: {
    color: '#ffffff',
    fontSize: 9,
  },
  cartContainer: {
    position: 'relative',
  },
});
