import {StyleSheet} from 'react-native';
import {color} from './palette';

export const spec = StyleSheet.create({
  space_horizontal: {
    paddingHorizontal: 16,
  },
});

export const flex = StyleSheet.create({
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export const box = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
});

export const common = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    paddingLeft: 16,
  },
  logo_center: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  position_left: {
    position: 'absolute',
    left: 0,
  },
  text_base: {
    fontSize: 16,
  },
  text_gray: {
    color: color.gray,
  },
});
