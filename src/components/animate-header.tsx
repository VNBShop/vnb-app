/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Animated, Image, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {color} from '../UIkit/palette';
import {banner, messenger, search} from '../assets';

const HEADER_HEIGHT = 200;
export default function AnimateHeader({animateValue}: any) {
  const insets = useSafeAreaInsets();

  const headerHeight = animateValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp',
  });

  const imageAnimation = animateValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: color.secondary,
      }}>
      <View
        style={{
          height: insets.top + 44,
          width: '100%',
          zIndex: 1,
          paddingHorizontal: 16,
          marginTop: 24,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image
            source={search}
            style={{width: 18, height: 18, marginLeft: 8}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ffffff"
            style={{
              width: '100%',
              backgroundColor: 'rgba(0,0,0, .3)',
              position: 'absolute',
              paddingVertical: 8,
              borderRadius: 9999,
              paddingLeft: 32,
              zIndex: -1,
            }}
          />
        </View>

        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ffffff',
            borderRadius: 99999,
            padding: 4,
            backgroundColor: 'rgba(0,0,0, .3)',
          }}>
          <Image
            source={messenger}
            style={{width: 18, height: 18, zIndex: 1}}
          />
        </View>
      </View>
      <Animated.Image
        source={banner}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          height: '100%',
          opacity: imageAnimation,
          objectFit: 'cover',
        }}
      />
    </Animated.View>
  );
}
