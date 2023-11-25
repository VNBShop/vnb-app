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
  marginVerticalBase: {
    marginVertical: 16,
  },
});

export const flex = StyleSheet.create({
  flex_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  inset: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    left: 16,
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
  text_secondary: {
    color: color.secondary,
  },
  text_success: {
    color: color.success,
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 18,
  },
  fz13: {
    fontSize: 13,
  },
  titleLeft: {
    fontSize: 22,
    fontWeight: '600',
  },
  fontBase: {
    fontWeight: '500',
  },
});
