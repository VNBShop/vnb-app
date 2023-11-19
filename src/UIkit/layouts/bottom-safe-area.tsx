import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SizeBox from './size-box';

export default function BottomSafeArea() {
  const insets = useSafeAreaInsets();

  return <SizeBox height={insets.bottom + 32} />;
}
