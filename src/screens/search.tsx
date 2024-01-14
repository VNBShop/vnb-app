import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {back} from '../assets';
import {Icon} from '../components/ui/icon';
import {RootStackProps} from '../../types/route';
import LottieView from 'lottie-react-native';
import {notFoundLottie} from '../lottie';
import {common} from '../UIkit/styles';
import SearchSkeleton from '../components/skeleton/search-skeleton';
import {useDebounce} from '../hooks/useDebounce';
import {useQuery} from '@tanstack/react-query';
import {Products} from '../../types/product';
import {getProducts} from '../api/public/product';

type SearchScreenProps = NativeStackScreenProps<RootStackProps, 'Search'>;
export default function SearchScreen({navigation}: SearchScreenProps) {
  const [searchVal, setSearchVal] = React.useState('');

  const searchValDebounce = useDebounce(searchVal, 1500);

  const {data, isError, isPending} = useQuery<Products[]>({
    queryKey: ['productSearch', searchValDebounce],
    queryFn: ({queryKey}) =>
      getProducts({
        currentPage: 1,
        pageSize: 7,
        filter: {search: queryKey[1]},
      }),
    enabled: !!searchValDebounce,
  });
  return (
    <SafeArea>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={25} icon={back} />
        </TouchableOpacity>
        <TextInput
          autoFocus
          onChangeText={val => setSearchVal(val)}
          style={styles.searchInput}
          placeholderTextColor={color.gray}
          placeholder="Search products"
        />
      </View>

      {data?.length ? (
        <View>
          {data.map(prod => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    productId: prod?.productId,
                  })
                }
                style={styles.prodItem}
                key={prod?.productId}>
                <Image
                  style={styles.prodImage}
                  source={{uri: prod?.productImages?.[0]}}
                />
                <View>
                  <Text style={styles.prodName}>{prod?.productName}</Text>
                  <Text style={styles.prodPrice}>
                    {prod?.productPrice?.toLocaleString('en-EN', {
                      currency: 'USD',
                      style: 'currency',
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}

      {!data?.length && isPending && !!searchVal ? (
        <View style={styles.skeletonContainer}>
          <SearchSkeleton />
        </View>
      ) : null}

      {!isPending && isError && !data?.length && !!searchVal && (
        <View style={styles.notFoundContainer}>
          <LottieView
            source={notFoundLottie}
            autoPlay
            loop
            style={styles.notFound}
          />
          <Text style={[common.text_base, common.text_gray]}>
            No thing to see!
          </Text>
        </View>
      )}
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0.6,
    borderColor: color.border_input,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 9999,
    backgroundColor: color.white,
    fontSize: 14,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    width: 200,
    height: 200,
  },
  skeletonContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 8,
  },
  prodItem: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: 'row',
    gap: 16,
  },
  prodImage: {
    width: 45,
    height: 45,
    borderRadius: 9999,
  },
  prodName: {
    fontSize: 16,
    marginBottom: 6,
  },
  prodPrice: {
    color: color.secondary,
  },
});
