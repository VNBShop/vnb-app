import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {back, cart_gray, search_gray} from '../assets';
import {common} from '../UIkit/styles';

export default function ProductScreen() {
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

        <View style={styles.search}>
          <Image style={styles.headerIcon} source={search_gray} />
          <Text style={[common.text_gray, common.text_base]}>Search</Text>
        </View>

        <BottomSafeArea />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
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
  search: {
    width: '100%',
    backgroundColor: color.divider,
    padding: 16,
    paddingVertical: 6,
    marginTop: 24,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
