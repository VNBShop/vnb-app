import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {color} from '../UIkit/palette';
import {common, flex} from '../UIkit/styles';
import {banner, cart, icon, messenger, order, search} from '../assets';
import {RootStackProps} from '../../types/route';
import {Icon, IconOutline} from './ui/icon';
import React from 'react';
import ModalSearch from './modals/modal-search';
import HrVertical from './ui/hrVertical';

export const HEADER_HEIGHT = 200;
export default function AnimateHeader({
  animateValue,
}: {
  animateValue: Animated.Value;
}) {
  const [modalSearch, setModalSearch] = React.useState(false);

  const insets = useSafeAreaInsets();

  const navigator = useNavigation<NavigationProp<RootStackProps>>();

  const headerHeight = animateValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 50],
    extrapolate: 'clamp',
  });

  const bannerAnimation = animateValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const specilaAnimation = animateValue.interpolate({
    inputRange: [0, (HEADER_HEIGHT + insets.top) / 3],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <ModalSearch open={modalSearch} onClose={() => setModalSearch(false)} />
      <Animated.View
        style={[
          styles.container,
          {
            height: headerHeight,
          },
        ]}>
        <View
          style={[
            styles.header,
            {height: insets.top + 50, paddingTop: insets.top},
          ]}>
          <LinearGradient colors={['#62C3CE', '#fff']} style={common.inset} />

          <Image source={icon} style={styles.logo} />

          <View style={flex.flex_row}>
            <TouchableOpacity
              style={styles.iconItem}
              onPress={() => setModalSearch(true)}>
              <IconOutline icon={search} size={36} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconItem}
              onPress={() => navigator.navigate('ConversationList')}>
              <IconOutline icon={messenger} size={36} />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.Image
          source={banner}
          style={[styles.banner, {opacity: bannerAnimation}]}
        />
        <Animated.View
          style={[
            styles.specialContainer,
            {
              opacity: specilaAnimation,
            },
          ]}>
          <View style={styles.specialContainerInline}>
            <TouchableOpacity onPress={() => navigator.navigate('Ordered')}>
              <View style={styles.specialItemContainer}>
                <Icon size={20} icon={order} />
                <Text style={common.text_base}>Ordered</Text>
              </View>
              <Text style={[common.text_gray, styles.mt]}>Find your order</Text>
            </TouchableOpacity>

            <HrVertical />

            <TouchableOpacity onPress={() => navigator.navigate('Cart')}>
              <View style={styles.specialItemContainer}>
                <Icon size={20} icon={cart} />
                <Text style={common.text_base}>My Cart</Text>
              </View>
              <Text style={[common.text_gray, styles.mt]}>Clean cart now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#62C3CE',
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconItem: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(0,0,0, .1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
  icon: {
    width: 19,
    height: 19,
    zIndex: 1,
  },
  banner: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    flex: 1,
  },
  specialContainer: {
    width: '100%',
    paddingHorizontal: 26,
    position: 'absolute',
    bottom: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specialContainerInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
    elevation: 1,
  },
  mt: {
    marginTop: 4,
  },
});
