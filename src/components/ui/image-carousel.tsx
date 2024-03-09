import * as React from 'react';
import {Animated, FlatList, Image, StyleSheet, View} from 'react-native';
import {WIDTH_DEVICE} from '../../UIkit/styles';
import Pagination from './pagination';
import {Post} from '../../../types/forum';

type IProps = {
  photos: Post['postImages'];
};

export default function ImageCarousel({photos}: IProps) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View>
      <FlatList
        data={photos}
        renderItem={({item}) => (
          <Image
            style={styles.image}
            source={typeof item === 'string' ? {uri: item} : item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item, index) => String(index)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />

      <Pagination data={photos} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH_DEVICE,
    height: 300,
    objectFit: 'contain',
    marginBottom: 16,
  },
});
