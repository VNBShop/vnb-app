import * as React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {
  back,
  cart_gray,
  search_gray,
  filter as filterIcon,
  new as newIcon,
} from '../assets';
import {fakeData} from '../utils/contants';

export const filters = [
  {
    label: 'Racket',
    value: 'racket',
  },
  {
    label: 'Shoe',
    value: 'shoe',
  },
  {
    label: 'Shirt',
    value: 'Shirt',
  },
  {
    label: 'Skirt',
    value: 'skirt',
  },
  {
    label: 'Pant',
    value: 'pant',
  },
  {
    label: 'Bag',
    value: 'bag',
  },
  {
    label: 'Backpack',
    value: 'backpack',
  },
  {
    label: 'Accessories',
    value: 'accessories',
  },
];

export default function ProductScreen() {
  const [filter, setFilter] = React.useState('');
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image style={styles.headerIcon} source={back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Products</Text>
          <TouchableOpacity>
            <Image style={styles.headerIcon} source={cart_gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.search}>
            <Image style={styles.headerIcon} source={search_gray} />
            <Text style={[common.text_gray, common.text_base]}>Search</Text>
          </View>
          <TouchableOpacity style={styles.filterIcon}>
            <Image source={filterIcon} style={styles.filterIconImg} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}>
            {filters.map(item => (
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  filter === item.value && styles.filterItemActive,
                ]}
                key={item.value}
                onPress={() => setFilter(item.value)}>
                <Text
                  style={[
                    styles.filterText,
                    filter === item.value && styles.filterTextActive,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.flatContainer}>
          <FlatList
            renderItem={({item}) => (
              <TouchableOpacity style={styles.productItem}>
                <Image source={item.image} style={styles.productImg} />
                <View style={styles.productInfo}>
                  <Text style={common.text_gray}>{item.name}</Text>

                  <Text style={styles.productPrice}>
                    {item.price.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.benefit}>
                  <View style={styles.discount}>
                    <Text style={styles.discountText}>-15%</Text>
                  </View>
                  <Image source={newIcon} style={styles.newImg} />
                </View>
              </TouchableOpacity>
            )}
            data={fakeData}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.gap}
            columnWrapperStyle={styles.gap}
            keyExtractor={item => item.id.toLocaleString()}
          />
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcon: {
    width: 27,
    height: 27,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
  filterIconImg: {
    width: '100%',
    height: '100%',
  },
  search: {
    flex: 1,
    backgroundColor: color.divider,
    padding: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterContainer: {
    marginBottom: 16,
    marginTop: 16,
    width: '100%',
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
  },
  filterItem: {
    padding: 8,
    paddingHorizontal: 20,
    borderWidth: 0.17,
    borderColor: color.gray,
    borderRadius: 6,
  },
  filterItemActive: {
    backgroundColor: color.primary,
  },
  filterText: {
    fontWeight: '500',
  },
  filterTextActive: {
    fontWeight: '600',
    color: '#ffffff',
  },
  flatContainer: {
    width: '100%',
    flex: 1,
  },
  productItem: {
    width: (WIDTH_DEVICE - 32) / 2,
    padding: 8,
    position: 'relative',
  },
  gap: {
    gap: 16,
    justifyContent: 'center',
  },
  productImg: {
    width: '100%',
    height: (WIDTH_DEVICE - 32) / 2,
  },
  productInfo: {
    marginTop: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  productPrice: {
    color: color.secondary,
    fontWeight: '500',
    marginTop: 16,
  },
  benefit: {
    position: 'absolute',
    top: 0,
    right: 8,
    alignItems: 'center',
    gap: 8,
  },
  discount: {
    borderRadius: 9999,
    backgroundColor: color.secondary,
    padding: 4,
  },
  discountText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 12,
  },
  newImg: {
    width: 30,
    height: 30,
    objectFit: 'cover',
  },
});
