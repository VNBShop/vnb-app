import {Animated, Easing, StyleSheet, ViewProps} from 'react-native';
import React, {useEffect, useRef} from 'react';

interface IProps extends ViewProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  delay?: number;
}
export const ShimmerView: React.FC<IProps> = ({
  height,
  width,
  delay,
  ...props
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 600,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          delay: delay || 0,
          toValue: 1,
          easing: Easing.inOut(Easing.circle),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          delay: delay || 0,
          toValue: 0,
          easing: Easing.inOut(Easing.circle),
        }),
      ]),
    ).start();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [pulseAnim, delay]);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.06, 0.18],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {width: width || 100, height: height || 150},
        {opacity: opacityAnim},
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});
