/* eslint-disable react/react-in-jsx-scope */
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SizeBox from './size-box';

export type SafeAreaProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export default function SafeArea({
  children,
  style,
  color = '#ffffff',
}: SafeAreaProps) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, style, {backgroundColor: color}]}>
      {children}
      <SizeBox height={insets.bottom ? 0 : 16} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
  },
});
