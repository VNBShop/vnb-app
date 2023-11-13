import * as React from 'react';

import {useKeyboard} from '@react-native-community/hooks';
import {
  Dimensions,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type KeyboardShiftProps = {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
  style?: StyleProp<ViewStyle>;
};

export default function KeyboardShift({
  children,
  keyboardVerticalOffset,
  style,
}: KeyboardShiftProps) {
  const shift = useSharedValue(0);
  const keyboard = useKeyboard();

  React.useEffect(() => {
    const keyboardShowSub = Keyboard.addListener(
      'keyboardDidShow',
      onKeyBoardDidShow,
    );
    const keyboardHideSub = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      keyboardShowSub.remove();
      keyboardHideSub.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyBoardDidShow = () => {
    const {height: windowHeight} = Dimensions.get('window');

    const keyboardHeight = keyboard.keyboardHeight;

    const currentlyFocusInputRef = TextInput.State.currentlyFocusedInput();

    currentlyFocusInputRef?.measure((x, y, width, height, pageX, pageY) => {
      const gap = windowHeight - keyboardHeight - (pageY + height);

      if (gap >= 0) {
        return;
      }

      shift.value = withTiming(gap, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    });
  };

  const onKeyboardDidHide = () => {
    shift.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  const animate = useAnimatedStyle(() => {
    return {paddingBottom: shift.value};
  });

  if (Platform.OS === 'android') {
    return (
      <Animated.View style={(styles.container, style, animate)}>
        {children}
      </Animated.View>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
