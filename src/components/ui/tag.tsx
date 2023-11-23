import * as React from 'react';
import {
  View,
  Text,
  ColorValue,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

export type TagProps = {
  content: string;
  backGroundColor?: ColorValue;
  textColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Tag({
  content,
  backGroundColor = '#000000',
  textColor = '#ffffff',
  style,
  textStyle,
}: TagProps) {
  return (
    <View style={[styles.container, {backgroundColor: backGroundColor}, style]}>
      <Text
        style={[
          styles.text,
          {color: textColor, backgroundColor: backGroundColor},
          textStyle,
        ]}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    padding: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
