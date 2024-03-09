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
      setIsSetMore(e.nativeEvent.lines.length >= 2);
    },
    [],
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={showMore ? 0 : 2}
        style={styles.text}>
        {status}
      </Text>
      {isSetMore && (
        <TouchableOpacity onPress={() => setShowMore(prev => !prev)}>
          <Text style={common.text_link}>
            {showMore ? 'Show less' : 'See more'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 22,
    marginBottom: 4,
  },
});
