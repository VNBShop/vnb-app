/* eslint-disable react/react-in-jsx-scope */
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {color} from '../UIkit/palette';
import {common} from '../UIkit/styles';
import {banner, cart, icon, messenger, order, search} from '../assets';

export const HEADER_HEIGHT = 200;
export default function AnimateHeader({animateValue}: any) {
  const insets = useSafeAreaInsets();

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

        <View style={styles.actionContainer}>
          <View style={styles.iconItem}>
            <Image source={search} style={styles.icon} />
          </View>
          <View style={styles.iconItem}>
            <Image source={messenger} style={styles.icon} />
          </View>
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
          <View>
            <View style={styles.specialItemContainer}>
              <Image source={order} style={styles.specialContainerItemImg} />
              <Text style={common.text_base}>Ordered</Text>
            </View>
            <Text style={[common.text_gray, styles.mt]}>Find your order</Text>
          </View>

          <View>
            <View style={styles.specialItemContainer}>
              <Image source={cart} style={styles.specialContainerItemImg} />
              <Text style={common.text_base}>Cart</Text>
            </View>
            <Text style={[common.text_gray, styles.mt]}>Empty your now</Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
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
    bottom: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialContainerItemImg: {
    width: 25,
    height: 25,
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
