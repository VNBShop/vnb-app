import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Route,
  SceneMap,
  TabBar,
  TabBarProps,
  TabView,
} from 'react-native-tab-view';
import {Scene} from 'react-native-tab-view/lib/typescript/src/types';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {back, search_gray} from '../assets';
import Order from '../components/order';
import {Icon} from '../components/ui/icon';
import {RootStackProps} from '../types/route';

type OrderedScreenProps = NativeStackScreenProps<RootStackProps, 'Ordered'>;

const renderScene = SceneMap({
  allorder: Order,
  processing: Order,
  shipping: Order,
  delivered: Order,
  cancelled: Order,
});

export default function OrderedScreen({navigation}: OrderedScreenProps) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'allorder', title: 'All order'},
    {key: 'processing', title: 'Processing'},
    {key: 'shipping', title: 'Shipping'},
    {key: 'delivered', title: 'Delivered'},
    {key: 'cancelled', title: 'Cancelled'},
  ]);

  const renderTabBar = (props: TabBarProps<Route>) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.indicatorBg}
      activeColor={color.secondary}
      labelStyle={styles.indicatorLabel}
      inactiveColor={color.primary}
      renderLabel={renderLabel}
      scrollEnabled
    />
  );

  const renderLabel = (
    props: Scene<Route> & {
      focused: boolean;
      color: string;
    },
  ) => (
    <Text
      style={[
        styles.label,
        {color: props.focused ? color.secondary : color.gray},
      ]}>
      {props.route.title}
    </Text>
  );

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={common.positionLeftBase}
          onPress={() => navigation.goBack()}>
          <Icon icon={back} size={25} />
        </TouchableOpacity>

        <Text style={common.headerTitle}>My ordered</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Icon size={20} icon={search_gray} />
          <Text style={common.text_gray}>Search products</Text>
        </View>
      </View>

      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: WIDTH_DEVICE}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
    marginTop: 24,
  },
  search: {
    paddingHorizontal: 16,
    borderRadius: 9990,
    padding: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  indicatorStyle: {
    backgroundColor: color.secondary,
  },
  indicatorBg: {
    backgroundColor: '#ffffff',
  },
  indicatorLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontWeight: '500',
  },
});
