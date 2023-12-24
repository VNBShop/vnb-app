import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Products} from '../../types/product';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {getProducts} from '../api/public/product';
import {
  cart_gray,
  filter as filterIcon,
  new as newIcon,
  search_gray,
} from '../assets';
import ProductsSkeleton from '../components/skeleton/products-skeleton';
import {Icon} from '../components/ui/icon';
import {notFoundLottie} from '../lottie';
import {RootStackProps} from '../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';

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

  const stackNavigator =
    useNavigation<NavigationProp<RootStackProps, 'ProductDetail'>>();

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery<Products[]>({
    queryKey: ['products', filter],
    queryFn: ({pageParam, queryKey}) =>
      getProducts({currentPage: pageParam as number, filter: queryKey[1]}),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPage) => allPage?.length + 1,
  });

  const flatData = data?.pages ? data?.pages?.flatMap(page => page) : [];

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={common.titleLeft}>Products</Text>
          <TouchableOpacity disabled={isLoading}>
            <Icon icon={cart_gray} size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.search}>
            <Icon icon={search_gray} size={20} />
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

        {flatData?.length && !isLoading ? (
          <View style={styles.flatContainer}>
            <FlatList
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.productItem}
                  onPress={() =>
                    stackNavigator.navigate('ProductDetail', {
                      productId: item.productId,
                    })
                  }>
                  <Image
                    source={{uri: item.productImages[0]}}
                    style={styles.productImg}
                  />
                  <View style={styles.productInfo}>
                    <Text style={common.text_gray}>{item.productName}</Text>

                    <Text style={styles.productPrice}>
                      {item.productPrice.toLocaleString('en-EN', {
                        currency: 'USD',
                        style: 'currency',
                      })}
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
              data={flatData}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              contentContainerStyle={styles.gap}
              columnWrapperStyle={styles.gap}
              keyExtractor={item => item.productId.toLocaleString()}
              ListFooterComponent={
                isPending || isFetchingNextPage ? (
                  <ActivityIndicator />
                ) : (
                  <BottomSafeArea />
                )
              }
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              refreshControl={
                <RefreshControl refreshing={isPending} onRefresh={refetch} />
              }
            />
          </View>
        ) : null}

        {isLoading ? <ProductsSkeleton /> : null}

        {isError && !isPending && !isLoading ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isPending} onRefresh={refetch} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notFoundContainer}>
            <LottieView
              source={notFoundLottie}
              autoPlay
              loop
              style={styles.notFound}
            />
            <Text style={[common.text_base, common.text_gray]}>
              No thing to see!
            </Text>
          </ScrollView>
        ) : null}
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    paddingVertical: 8,
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  notFound: {
    width: 200,
    height: 200,
  },
});
