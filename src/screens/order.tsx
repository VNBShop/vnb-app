import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
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
import {RootStackProps} from '../../types/route';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {back} from '../assets';
import Order from '../components/order';
import {Icon} from '../components/ui/icon';

type OrderedScreenProps = NativeStackScreenProps<RootStackProps, 'Ordered'>;

const renderScene = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackProps, 'Ordered', undefined>;
}) =>
  SceneMap({
    allorder: () => <Order navigation={navigation} />,
    processing: () => <Order navigation={navigation} status="PENDING" />,
    shipping: () => <Order navigation={navigation} status="DELIVERING" />,
    delivered: () => <Order navigation={navigation} status="SUCCESS" />,
    cancelled: () => <Order navigation={navigation} status="CANCELLED" />,
  });

export default function OrderedScreen({navigation, route}: OrderedScreenProps) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(route?.params?.tab ?? 0);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon icon={back} size={25} />
        </TouchableOpacity>

        <Text style={styles.headerTilte}>My ordered</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Root')}>
          <Text style={common.text_link}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene({navigation})}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  headerTilte: {
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    marginTop: 20,
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
