import * as React from 'react';
import {
  View,
  Text,
  ColorValue,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ImageProps,
  Image,
} from 'react-native';

export type TagProps = {
  content: string;
  backGroundColor?: ColorValue;
  textColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ImageProps;
  iconSize?: number;
};

export default function Tag({
  content,
  backGroundColor = '#000000',
  textColor = '#ffffff',
  style,
  textStyle,
  icon,
  iconSize = 15,
}: TagProps) {
  return (
    <View style={[styles.container, {backgroundColor: backGroundColor}, style]}>
      {icon ? (
        <Image source={icon} style={{width: iconSize, height: iconSize}} />
      ) : null}
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
    paddingVertical: 6,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
