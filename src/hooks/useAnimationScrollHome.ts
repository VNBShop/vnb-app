import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {HEADER_HEIGHT} from '../components/animate-header';
import {EdgeInsets} from 'react-native-safe-area-context';

type Props = {
  event: NativeSyntheticEvent<NativeScrollEvent>;
  insets: EdgeInsets;
  offset: Animated.Value;
  scrollViewRef: React.MutableRefObject<ScrollView | null>;
  scrollTimeout: NodeJS.Timeout | null;
};

export const handleScrollEnd = ({
  event,
  insets,
  offset,
  scrollViewRef,
  scrollTimeout,
}: Props) => {
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
