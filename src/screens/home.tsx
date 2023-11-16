import * as React from 'react';

import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import AnimateHeader from '../components/animate-header';
import {navList} from '../utils/contants';
import {WIDTH_DEVICE, common} from '../UIkit/styles';

export default function HomeScreen() {
  const offset = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeArea>
      <AnimateHeader animateValue={offset} />

      <ScrollView
        style={styles.view}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.navContainer}>
          {navList.map(item => (
            <View key={item.id} style={styles.navItem}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={common.text_gray}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text>Top user</Text>
        </View>
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
    paddingTop: 220,
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
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 4,
    objectFit: 'contain',
  },
});
