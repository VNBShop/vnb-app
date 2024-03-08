import {NavigationProp, useNavigation} from '@react-navigation/native';
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
import {Drawer} from 'react-native-drawer-layout';
import {RootStackProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {
  cart_gray,
  filter as filterIcon,
  new as newIcon,
  search_gray,
} from '../assets';
import ModalSearch from '../components/modals/modal-search';
import ProductsFilter from '../components/products/products-filter';
import ProductsSort from '../components/products/products-sort';
import ProductsSkeleton from '../components/skeleton/products-skeleton';
import {Icon, IconOutline} from '../components/ui/icon';
import useFetchProduct from '../hooks/product/useFetchProducts';
import {notFoundLottie} from '../lottie';

export default function ProductScreen() {
  const [searchModal, setSearchModal] = React.useState(false);

  const [filterContainer, setFilterContainer] = React.useState(false);

  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    products,
    refetch,
    setFilter,
  } = useFetchProduct();

  const stackNavigator =
    useNavigation<NavigationProp<RootStackProps, 'ProductDetail'>>();

  return (
    <>
      <ModalSearch open={searchModal} onClose={() => setSearchModal(false)} />
      <SafeArea>
        <Drawer
          open={filterContainer}
          onClose={() => setFilterContainer(false)}
          onOpen={() => setFilterContainer(true)}
          renderDrawerContent={() => {
            return <ProductsFilter setFilter={setFilter} />;
          }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={common.titleLeft}>Products</Text>
              <TouchableOpacity
                disabled={isPending}
                onPress={() => stackNavigator.navigate('Cart')}>
                <IconOutline icon={cart_gray} size={36} />
              </TouchableOpacity>
            </View>

            {!!products.length && (
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  onPress={() => setSearchModal(true)}
                  style={styles.search}>
                  <Icon icon={search_gray} size={20} />
                  <Text style={[common.text_gray, common.text_base]}>
                    Search
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.filterIcon}
                  onPress={() => setFilterContainer(true)}>
                  <Image source={filterIcon} style={styles.filterIconImg} />
                </TouchableOpacity>
              </View>
            )}
            {!!products?.length && <ProductsSort setFilter={setFilter} />}

            {products?.length && !isError ? (
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
                          {item.productPrice.toLocaleString('vi-VI', {
                            currency: 'VND',
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
                  data={products}
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
                    <RefreshControl
                      refreshing={isPending}
                      onRefresh={refetch}
                    />
                  }
                />
              </View>
            ) : null}

            {isFetchingNextPage || isPending ? <ProductsSkeleton /> : null}

            {isError && !isPending && !isFetchingNextPage ? (
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
        </Drawer>
      </SafeArea>
    </>
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
    marginTop: 16,
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
    paddingVertical: 10,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    objectFit: 'contain',
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
