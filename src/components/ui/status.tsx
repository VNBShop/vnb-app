import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {common} from '../../UIkit/styles';

export default function Status() {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <>
      <Text numberOfLines={showMore ? 0 : 2} style={styles.text}>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content. Lorem ipsum may be used as a
        placeholder before final copy is available
      </Text>
      <TouchableOpacity onPress={() => setShowMore(prev => !prev)}>
        <Text style={common.text_link}>
          {showMore ? 'Show less' : 'See more'}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 22,
    marginBottom: 4,
  },
});
