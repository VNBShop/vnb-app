import * as React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabProps} from '../../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import AnimateHeader from '../components/animate-header';
import HotSale from '../components/hot-sale';
import Popular from '../components/popular';
import {Icon} from '../components/ui/icon';
import {handleScrollEnd} from '../hooks/useAnimationScrollHome';
import {navList} from '../libs/contants';
import {ballLottie} from '../lottie';

type HomeScreenProps = NativeStackScreenProps<BottomTabProps, 'Home'>;
export default function HomeScreen({navigation}: HomeScreenProps) {
  const offset = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const insets = useSafeAreaInsets();
  const scrollTimeout: NodeJS.Timeout | null = null;

  return (
    <>
      <SafeArea>
        <AnimateHeader animateValue={offset} />

        <ScrollView
          ref={scrollViewRef}
          style={styles.view}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScrollEndDrag={event =>
            handleScrollEnd({
              event,
              insets,
              offset,
              scrollViewRef,
              scrollTimeout,
            })
          }
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {useNativeDriver: false},
          )}>
          <View style={styles.navContainer}>
            {navList.map(item => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Product')}
                key={item.id}
                style={styles.navItem}>
                <Icon icon={item.icon} size={30} />
                <Text style={common.text_gray}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('Product')}
              style={styles.navItem}>
              <LottieView
                source={ballLottie}
                autoPlay
                loop
                style={styles.lottie}
              />
              <Text style={common.text_gray}>Other</Text>
            </TouchableOpacity>
          </View>

          <HotSale />

          <Popular />

          <BottomSafeArea />
        </ScrollView>
      </SafeArea>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 265,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    rowGap: 24,
    flexWrap: 'wrap',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH_DEVICE / 4 - 18,
    gap: 6,
  },
  lottie: {
    width: 30,
    height: 30,
  },
});
