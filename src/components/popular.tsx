import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {heartOutline} from '../assets';
import {fakeData} from '../libs/contants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabProps, RootStackProps} from '../types/route';

export default function Popular() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Root'>>();

  const bottomNav =
    useNavigation<NativeStackNavigationProp<BottomTabProps, 'Home'>>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular</Text>
        <TouchableOpacity onPress={() => bottomNav.navigate('Product')}>
          <Text style={common.text_link}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productContainer}>
        {fakeData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail')}>
            <Image source={item.image} style={styles.itemImg} />
            <View style={styles.body}>
              <Text style={common.text_gray}>{item.name}</Text>
              <View style={styles.footer}>
                <Text style={common.text_secondary}>
                  {item.price.toLocaleString()}
                </Text>
                <TouchableOpacity>
                  <Image source={heartOutline} style={styles.heartIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
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
    width: '100%',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
    rowGap: 32,
  },
  item: {
    width: (WIDTH_DEVICE - 48) / 2,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    gap: 8,
  },
  itemImg: {
    width: '100%',
    height: (WIDTH_DEVICE - 48) / 2,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
    padding: 8,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});
