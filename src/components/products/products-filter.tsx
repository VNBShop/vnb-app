/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import stores from '../../api/public/stores';
import {brands} from '../../libs/contants';
import CheckboxCard from '../ui/checkbox-card';
import {color} from '../../UIkit/palette';
import {FilterProps} from '../../screens/products';
import {useQuery} from '@tanstack/react-query';
import getStores from '../../api/public/stores';
import {ProductStore} from '../../../types/product';

type ProductsFilterProps = {
  setFilter: (value: React.SetStateAction<FilterProps>) => void;
};

export default function ProductsFilter({setFilter}: ProductsFilterProps) {
  const [brandsFilter, setBrandsFilter] = React.useState<number[]>([]);
  const [storesFilter, setStoresFilter] = React.useState<number[]>([]);
  const [isTransitionPending, startTransition] = React.useTransition();

  const {data: dataStores} = useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const stores = (dataStores?.data?.metadata as ProductStore[]) ?? [];

  React.useEffect(() => {
    if (brandsFilter?.length) {
      const brandIdsConcat = brandsFilter.join('.');
      startTransition(() => {
        setFilter(prev => ({...prev, brandIds: brandIdsConcat}));
      });
    } else {
      startTransition(() => {
        setFilter(prev => {
          const {brandIds: _, ...rest} = prev;
          return {...rest};
        });
      });
    }
  }, [brandsFilter]);

  React.useEffect(() => {
    if (storesFilter?.length) {
      const storeIdsConcat = storesFilter.join('.');
      startTransition(() => {
        setFilter(prev => ({...prev, storeIds: storeIdsConcat}));
      });
    } else {
      startTransition(() => {
        setFilter(prev => {
          const {storeIds: _, ...rest} = prev;
          return {...rest};
        });
      });
    }
  }, [storesFilter]);
  return (
    <ScrollView style={styles.filterWrapper}>
      <Text style={styles.filterTitle}>Filters</Text>

      <Text style={styles.filterTitleSM}>Brands</Text>

      <View style={styles.brandsFilter}>
        {brands.map(brand => (
          <TouchableOpacity
            key={brand.brandId}
            disabled={isTransitionPending}
            onPress={() => {
              setBrandsFilter(prev => {
                const findIndex = prev.indexOf(brand.brandId);

                if (findIndex !== -1) {
                  return prev
                    .slice(0, findIndex)
                    .concat(prev.slice(findIndex + 1));
                } else {
                  return [...prev, brand.brandId];
                }
              });
            }}>
            <CheckboxCard
              isAcive={brandsFilter.includes(brand.brandId)}
              label={brand.brandName}
            />
          </TouchableOpacity>
        ))}
      </View>

      {stores?.length ? (
        <>
          <Text style={styles.filterTitleSM}>Stores</Text>

          <View style={styles.brandsFilter}>
            {stores.map(store => (
              <TouchableOpacity
                disabled={isTransitionPending}
                key={store.storeId}
                onPress={() => {
                  setStoresFilter(prev => {
                    const findIndex = prev.indexOf(store.storeId);

                    if (findIndex !== -1) {
                      return prev
                        .slice(0, findIndex)
                        .concat(prev.slice(findIndex + 1));
                    } else {
                      return [...prev, store.storeId];
                    }
                  });
                }}>
                <CheckboxCard
                  isAcive={storesFilter.includes(store.storeId)}
                  label={store.storeName}
                />
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    padding: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterTitleSM: {
    fontSize: 16,
    color: color.secondary,
    marginTop: 16,
  },
  brandsFilter: {
    marginTop: 12,
    rowGap: 14,
  },
});
