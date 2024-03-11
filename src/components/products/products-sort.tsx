import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {color} from '../../UIkit/palette';
import {sorts} from '../../libs/contants';
import {FilterProps} from '../../hooks/product/useFetchProducts';

type ProductsSortProps = {
  filter: FilterProps;
  setFilter: React.Dispatch<React.SetStateAction<FilterProps>>;
};
export default function ProductsSort({setFilter, filter}: ProductsSortProps) {
  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}>
        {sorts.map(item => (
          <TouchableOpacity
            style={[
              styles.filterItem,
              filter?.sort === item.value && styles.filterItemActive,
            ]}
            key={item.value}
            onPress={() => {
              setFilter(prev => {
                if (prev?.sort === item.value) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const {sort, ...props} = prev;
                  return {...props};
                } else {
                  return {...prev, sort: item.value};
                }
              });
            }}>
            <Text
              style={[
                styles.filterText,
                filter?.sort === item.value && styles.filterTextActive,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
