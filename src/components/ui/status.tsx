import * as React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
} from 'react-native';
import {common} from '../../UIkit/styles';

type IProps = {
  status: string;
};
export default function Status({status}: IProps) {
  const [showMore, setShowMore] = React.useState(false);
  const [isSetMore, setIsSetMore] = React.useState(false);

  const onTextLayout = React.useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      console.log('is', e.nativeEvent.lines.length);

      setIsSetMore(e.nativeEvent.lines.length >= 4);
    },
    [],
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={showMore ? 0 : 2}
        style={styles.text}>
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
