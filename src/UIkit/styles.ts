import {Dimensions, StyleSheet} from 'react-native';
import {color} from './palette';

export const {width: WIDTH_DEVICE, height: HEIGHT_DEVICE} =
  Dimensions.get('window');

export const spec = StyleSheet.create({
  space_horizontal: {
    paddingHorizontal: 16,
  },
  mt_xl: {
    marginTop: 24,
  },
  mt_2xl: {
    marginTop: 32,
  },
  mt_3xl: {
    marginTop: 64,
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
  flex_full: {
    flex: 1,
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
  text_white: {
    color: '#ffffff',
  },
  des_lineheight: {
    lineHeight: 24,
  },
  text_link: {
    color: color.link,
  },
});
