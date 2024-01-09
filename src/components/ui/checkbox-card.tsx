/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {color} from '../../UIkit/palette';
import {checkWhite} from '../../assets';

export type CheckboxCardProps = {
  size?: number;
  logoSize?: number;
  label: string;
  labelLogo?: ImageSourcePropType;
  textSize?: number;
  isAcive?: boolean;
};
export default function CheckboxCard({
  size = 18,
  label,
  labelLogo,
  logoSize = 25,
  textSize = 14,
  isAcive,
}: CheckboxCardProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.border,
          {
            width: size,
            height: size,
            backgroundColor: isAcive ? color.secondary : '#ffffff',
          },
        ]}>
        {isAcive ? (
          <Image
            source={checkWhite}
            style={{
              width: size * 0.7,
              height: size * 0.7,
            }}
          />
        ) : null}
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
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: color.border_input,
  },
  logo: {
    objectFit: 'contain',
  },
});
