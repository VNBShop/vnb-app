import * as React from 'react';

import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {HEIGHT_DEVICE} from '../UIkit/styles';
import AnimateHeader from '../components/animate-header';

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
        <View style={{height: HEIGHT_DEVICE * 10}}>
          <Text>Open up App.js to start working on your app!</Text>
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
    alignItems: 'center',
    paddingTop: 220,
    paddingHorizontal: 20,
  },
});
