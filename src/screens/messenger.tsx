import * as React from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {HEIGHT_DEVICE, common} from '../UIkit/styles';
import {banner, messenger, search} from '../assets';

export default function HomeScreen() {
  return (
    <View style={common.flex_full}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Image source={search} style={styles.searchIcon} />
            <TextInput
              placeholderTextColor="rgba(255,255,255, .6)"
              placeholder="Search"
              style={styles.searchInput}
            />
          </View>

          <Image source={messenger} style={styles.searchIcon} />
        </View>
        <Image source={banner} style={styles.bannerImage} />
        <View style={styles.lowerHeader} />
      </SafeAreaView>

      <ScrollView>
        <View style={styles.paddingForHeader} />
        <View style={styles.scrollViewContent} />
      </ScrollView>
    </View>
  );
}

const HEADER_UPPER = 50;
const HEADER_LOWER = 200;

const styles = StyleSheet.create({
  upperHeaderPlaceholder: {
    height: HEADER_UPPER,
  },
  header: {
    position: 'absolute',
    width: '100%',
  },
  upperHeader: {
    height: HEADER_UPPER,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  lowerHeader: {
    height: HEADER_LOWER,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  paddingForHeader: {
    height: HEADER_LOWER,
  },
  scrollViewContent: {
    height: HEIGHT_DEVICE * 2,
    backgroundColor: '#ffffff',
  },
  searchIcon: {
    width: 20,
    height: 20,
    objectFit: 'cover',
    marginLeft: 8,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,.3)',
    position: 'absolute',
    width: '100%',
    paddingVertical: 8,
    paddingLeft: 32,
    borderRadius: 9999,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
