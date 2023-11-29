import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {common, spec} from '../UIkit/styles';
import {fakeData} from '../libs/contants';
import {color} from '../UIkit/palette';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabProps, RootStackProps} from '../types/route';

export default function HotSale() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();

  const bottomNav =
    useNavigation<NativeStackNavigationProp<BottomTabProps, 'Home'>>();

  return (
    <View style={[spec.space_horizontal, styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Hot sales</Text>
        <TouchableOpacity>
          <Text
            style={common.text_link}
            onPress={() => bottomNav.navigate('Product')}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productContainer}>
        {fakeData.map(item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail')}
            key={item.id}
            style={styles.item}>
            <View>
              <Image source={item.image} style={styles.image} />
              <Text style={common.text_gray}>{item.name}</Text>
            </View>
            <Text style={styles.price}>{item.price.toLocaleString()}</Text>

            <View style={styles.sale}>
              <Text style={styles.textSale}>-35%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  productContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  item: {
    width: 140,
    justifyContent: 'space-between',
    position: 'relative',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 140,
    objectFit: 'contain',
  },
  price: {
    color: color.secondary,
    marginTop: 8,
  },
  sale: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: color.secondaryPastel,
    padding: 4,
    borderRadius: 99999,
  },
  textSale: {
    color: color.secondary,
    fontWeight: '500',
    fontSize: 12,
  },
});
