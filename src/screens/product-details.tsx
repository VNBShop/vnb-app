import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import {back, cartPlus, cart_gray, heartOutline, share, tenis} from '../assets';
import CommentCard from '../components/ui/comment-card';
import OrHr from '../components/ui/or-hr';
import ProductDescription from '../components/product-description';
import Tag from '../components/ui/tag';
import {Icon} from '../components/ui/icon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../types/route';

type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ProductDetail'
>;

export default function ProductDetailScreen({
  navigation,
}: ProductDetailScreenProps) {
  return (
    <SafeArea>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={25} icon={back} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon size={25} icon={cart_gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={spec.space_horizontal}>
          <View style={styles.imageContainer}>
            <Image source={tenis} style={styles.imageProduct} />
          </View>

          <View style={styles.productInfoContainer}>
            <View style={styles.tag}>
              <Tag
                content="Authentic"
                textColor={'#2e9e88'}
                backGroundColor={'#d3f4ea'}
              />
            </View>
            <Text style={common.text_base}>Babolat Pure Drive Team 2021</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {Number(3200000).toLocaleString()}
              </Text>
              <Text style={styles.sale}>-20%</Text>
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

          <ProductDescription />

          <OrHr marginVertical={24} />

          <View>
            <Text style={common.text_base}>Product reviews</Text>
            <CommentCard />
          </View>
        </ScrollView>
      </View>

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
});
