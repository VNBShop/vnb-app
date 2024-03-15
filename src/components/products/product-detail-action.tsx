/* eslint-disable react-native/no-inline-styles */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {ProductDetail, ProductStock} from '../../../types/product';
import {RootStackProps} from '../../../types/route';
import BottomSafeArea from '../../UIkit/layouts/bottom-safe-area';
import {color} from '../../UIkit/palette';
import {common, flex, spec} from '../../UIkit/styles';
import {cartPlus, xmark} from '../../assets';
import {Icon} from '../ui/icon';
import useCreateCart, {CreateCartPayload} from '../../hooks/cart/useCreateCart';

type IProps = {
  product: ProductDetail;
  navigation: NativeStackNavigationProp<
    RootStackProps,
    'ProductDetail',
    undefined
  >;
};

export default function ProductDetailAction({product, navigation}: IProps) {
  const [stock, setStock] = React.useState<ProductStock>({} as ProductStock);
  const [quantity, setQuantity] = React.useState('1');

  const popup = React.useRef<Modalize>();
  const popupAddToCart = React.useRef<Modalize>();

  const onOpen = () => {
    !!popup?.current && popup.current?.open();
  };

  const onOpenPopupAddToCart = () => {
    !!popupAddToCart?.current && popupAddToCart.current?.open();
  };

  const onClose = () => {
    !!popup?.current && popup.current?.close();
    setStock({} as ProductStock);
    setQuantity('1');
  };

  const onClosePopupAddTocart = () => {
    !!popupAddToCart?.current && popupAddToCart.current?.close();
    setStock({} as ProductStock);
  };

  const {loading, onAddToCart} = useCreateCart({
    navigation: navigation,
    onSuccess: () => {
      console.log('run >>');

      onClosePopupAddTocart();

      if (product?.productIsHaveSize) {
        onClose();
      }
    },
  });

  const onIncrease = () => {
    const newQuantity = parseInt(quantity, 10) + 1;

    setQuantity(newQuantity.toString());
  };

  const onDecrease = () => {
    const newQuantity = parseInt(quantity, 10) - 1;
    if (newQuantity > 0) {
      setQuantity(newQuantity.toString());
    }
  };

  const onBuyInPopup = () => {
    if (!quantity || !stock?.productStockId) {
      return;
    }

    const payload: CreateCartPayload = {
      productSizeId: stock.productStockId,
      quantity: parseInt(quantity, 10),
      isBuyNow: true,
    };

    onAddToCart(payload);
  };

  const onAddInPopup = () => {
    if (!stock?.productStockId) {
      return;
    }

    const payload: CreateCartPayload = {
      productSizeId: stock.productStockId,
      quantity: 1,
    };

    onAddToCart(payload);
  };

  const onAdd = () => {
    if (product?.productIsHaveSize) {
      onOpenPopupAddToCart();
    } else {
      const payload: CreateCartPayload = {
        productSizeId: product?.productStocks[0]?.productStockId,
        quantity: 1,
      };
      onAddToCart(payload);
    }
  };

  const onBuynow = () => {
    if (product?.productIsHaveSize) {
      onOpen();
    } else {
      const payload: CreateCartPayload = {
        productSizeId: product?.productStocks[0]?.productStockId,
        quantity: 1,
        isBuyNow: true,
      };
      onAddToCart(payload);
    }
  };

  return (
    <>
      {product?.productStatus && (
        <View style={styles.action}>
          <TouchableOpacity disabled={loading} onPress={onAdd}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon size={30} icon={cartPlus} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            style={styles.buyBtn}
            onPress={onBuynow}>
            {loading && <ActivityIndicator />}

            <Text style={styles.buyText}>Buying now</Text>
          </TouchableOpacity>
        </View>
      )}

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={false}
          adjustToContentHeight
          // modalHeight={270}
          ref={popup}
          HeaderComponent={
            <View style={styles.header}>
              <Icon onPress={onClose} size={22} icon={xmark} />
            </View>
          }>
          <View>
            <View style={styles.body}>
              <Image
                style={styles.image}
                source={{uri: product?.productImages[0] ?? ''}}
              />

              <View style={common.flex_full}>
                <Text style={styles.name}>{product?.productName}</Text>
                <Text
                  style={{
                    color: color.secondary,
                  }}>
                  {product?.productPrice?.toLocaleString('vi-VI', {
                    currency: 'VND',
                    style: 'currency',
                  })}
                </Text>

                <View style={styles.sizes}>
                  {product?.productStocks?.map(size => (
                    <TouchableOpacity
                      style={[
                        styles.size,
                        {
                          backgroundColor:
                            stock?.productStockId === size?.productStockId
                              ? '#387ADF'
                              : '#ffffff',
                        },
                      ]}
                      key={size?.productStockId}
                      onPress={() => {
                        if (stock?.productStockId === size?.productStockId) {
                          setStock({} as ProductStock);
                        } else {
                          setStock(size);
                        }
                      }}>
                      <Text
                        style={{
                          color:
                            stock?.productStockId === size?.productStockId
                              ? '#ffffff'
                              : '#000000',
                        }}>
                        {size?.productStockSize}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {!!Object.keys(stock ?? {})?.length && (
              <View style={[flex.between, spec.space_horizontal]}>
                <View style={styles.quantity}>
                  <Text style={styles.quantityText}>Quantity: </Text>
                  <Text style={styles.quantityText}>
                    {stock?.productStockQuantity}
                  </Text>
                </View>

                <View style={styles.action1}>
                  <TouchableOpacity
                    disabled={parseInt(quantity, 10) <= 1}
                    style={styles.btn}
                    onPress={onDecrease}>
                    <Text style={styles.textSize}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={value => {
                      if (!value) {
                        setQuantity('1');
                      } else {
                        setQuantity(value);
                      }
                    }}
                  />
                  <TouchableOpacity
                    disabled={
                      parseInt(quantity, 10) >= stock?.productStockQuantity
                    }
                    style={styles.btn}
                    onPress={onIncrease}>
                    <Text style={styles.textSize}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              disabled={loading || !quantity || !stock?.productStockId}
              style={[
                styles.button,
                {
                  backgroundColor:
                    loading || !quantity || !stock?.productStockId
                      ? 'gray'
                      : 'black',
                },
              ]}
              onPress={onBuyInPopup}>
              {loading && <ActivityIndicator />}
              <Text style={common.text_white}>Buying</Text>
            </TouchableOpacity>

            <BottomSafeArea />
          </View>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          adjustToContentHeight
          // modalHeight={270}
          ref={popupAddToCart}
          HeaderComponent={
            <View style={styles.header}>
              <Icon onPress={onClosePopupAddTocart} size={22} icon={xmark} />
            </View>
          }>
          <View>
            <View style={styles.body}>
              <Image
                style={styles.image}
                source={{uri: product?.productImages[0] ?? ''}}
              />

              <View style={common.flex_full}>
                <Text style={styles.name}>{product?.productName}</Text>
                <Text
                  style={{
                    color: color.secondary,
                  }}>
                  {product?.productPrice?.toLocaleString('vi-VI', {
                    currency: 'VND',
                    style: 'currency',
                  })}
                </Text>

                <View style={styles.sizes}>
                  {product?.productStocks?.map(size => (
                    <TouchableOpacity
                      style={[
                        styles.size,
                        {
                          backgroundColor:
                            stock?.productStockId === size?.productStockId
                              ? '#387ADF'
                              : '#ffffff',
                        },
                      ]}
                      key={size?.productStockId}
                      onPress={() => {
                        if (stock?.productStockId === size?.productStockId) {
                          setStock({} as ProductStock);
                        } else {
                          setStock(size);
                        }
                      }}>
                      <Text
                        style={{
                          color:
                            stock?.productStockId === size?.productStockId
                              ? '#ffffff'
                              : '#000000',
                        }}>
                        {size?.productStockSize}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {!!Object.keys(stock ?? {})?.length && (
              <View style={[spec.space_horizontal, {alignSelf: 'flex-end'}]}>
                <View style={[styles.quantity]}>
                  <Text style={styles.quantityText}>Quantity: </Text>
                  <Text style={styles.quantityText}>
                    {stock?.productStockQuantity}
                  </Text>
                </View>

                {/* <View style={styles.action1}>
                  <TouchableOpacity
                    disabled={parseInt(quantity, 10) <= 1}
                    style={styles.btn}
                    onPress={onDecrease}>
                    <Text style={styles.textSize}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={value => {
                      if (!value) {
                        setQuantity('1');
                      } else {
                        setQuantity(value);
                      }
                    }}
                  />
                  <TouchableOpacity
                    disabled={
                      parseInt(quantity, 10) >= stock?.productStockQuantity
                    }
                    style={styles.btn}
                    onPress={onIncrease}>
                    <Text style={styles.textSize}>+</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            )}

            <TouchableOpacity
              disabled={loading || !stock?.productStockId}
              style={[
                styles.button,
                {
                  backgroundColor:
                    loading || !stock?.productStockId ? 'gray' : 'black',
                },
              ]}
              onPress={onAddInPopup}>
              {loading && <ActivityIndicator />}
              <Text style={common.text_white}>Add to cart</Text>
            </TouchableOpacity>

            <BottomSafeArea />
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    marginTop: 24,
    marginHorizontal: 16,
    height: 50,
    borderRadius: 8,
    gap: 8,
    flexDirection: 'row',
  },
  quantityText: {
    color: '#344955',
  },
  quantity: {
    marginTop: 16,
    flexDirection: 'row',
  },
  textSize: {
    fontSize: 25,
  },
  action1: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
    width: 50,
    borderBottomWidth: 1,
    borderBottomColor: color.border_input,
  },
  btn: {
    padding: 8,
  },
  sizes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  size: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: color.border_input,
  },
  body: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    paddingTop: 16,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  buyBtn: {
    paddingVertical: 12,
    backgroundColor: color.primary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  buyText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
  },
});
