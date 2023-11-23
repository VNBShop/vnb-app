import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {color} from '../UIkit/palette';

export type RadioCardProps = {
  size?: number;
  logoSize?: number;
  label: string;
  labelLogo?: ImageSourcePropType;
  textSize?: number;
  isAcive?: boolean;
};
export default function RadioCard({
  size = 18,
  label,
  labelLogo,
  logoSize = 25,
  textSize = 14,
  isAcive,
}: RadioCardProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.border, {width: size, height: size}]}>
        {isAcive ? <View style={styles.dot} /> : null}
      </View>
      {labelLogo ? (
        <Image
          source={labelLogo}
          style={[styles.logo, {width: logoSize, height: logoSize}]}
        />
      ) : null}
      <Text style={{fontSize: textSize}}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  border: {
    borderRadius: 9999,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: color.gray,
  },
  dot: {
    width: '100%',
    height: '100%',
    backgroundColor: color.link,
    borderRadius: 9999,
  },
  logo: {
    objectFit: 'contain',
  },
});
