import * as React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import AnimateHeader, {HEADER_HEIGHT} from '../components/animate-header';
import HotSale from '../components/hot-sale';
import Popular from '../components/popular';
import {Icon} from '../components/ui/icon';
import {BottomTabProps} from '../types/route';
import {navList} from '../libs/contants';
import LottieView from 'lottie-react-native';
import {ballLottie} from '../lottie';
import useAuth from '../_store/useAuth';
import env from './../libs/env';

type HomeScreenProps = NativeStackScreenProps<BottomTabProps, 'Home'>;
export default function HomeScreen({navigation}: HomeScreenProps) {
  const offset = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const insets = useSafeAreaInsets();

  let scrollTimeout: NodeJS.Timeout | null = null;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    const {contentOffset} = event.nativeEvent;
    if (contentOffset && contentOffset?.y !== undefined) {
      scrollTimeout = setTimeout(() => {
        const offsetY = contentOffset.y;

        if (
          offsetY > (HEADER_HEIGHT + insets.top) / 2 &&
          offsetY <= HEADER_HEIGHT + insets.top
        ) {
          Animated.timing(offset, {
            toValue: HEADER_HEIGHT + insets.top,
            duration: 500,
            useNativeDriver: false,
          }).start();

          if (!scrollViewRef.current) {
            return;
          }
          scrollViewRef.current.scrollTo({
            y: HEADER_HEIGHT + insets.top,
            animated: true,
          });
        } else {
          if (offsetY <= (HEADER_HEIGHT + insets.top) / 2) {
            Animated.timing(offset, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }).start();

            if (!scrollViewRef.current) {
              return;
            }
            scrollViewRef.current.scrollTo({y: 0, animated: true});
          }
        }
      }, 1300);
    }
  };

  const {name, setName} = useAuth(state => state);

  return (
    <SafeArea>
      <AnimateHeader animateValue={offset} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.view}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEnd}
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

        <Text>{env.API_URL}</Text>

        <TouchableOpacity onPress={setName}>
          <Text>Add</Text>
        </TouchableOpacity>

        <HotSale />

        <Popular />

        <BottomSafeArea />
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 270,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    rowGap: 16,
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
