/* eslint-disable react/react-in-jsx-scope */
import {Animated, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {banner, icon, messenger, search} from '../assets';
import {common} from '../UIkit/styles';

const HEADER_HEIGHT = 200;
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#62C3CE',
  },
  header: {
    width: '100%',
    zIndex: 1,
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
});
