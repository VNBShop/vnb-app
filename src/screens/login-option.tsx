import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import {icon} from '../assets';
import GooogleSigninButton from '../components/google-signin';
import OrHr from '../components/ui/or-hr';
import {RootStackProps} from '../../types/route';

type LoginOptionScreenProps = NativeStackScreenProps<
  RootStackProps,
  'LoginOption'
>;

export default function LoginOptionScreen({
  navigation,
}: LoginOptionScreenProps) {
  return (
    <SafeArea>
      <View style={[spec.space_horizontal, common.flex_full]}>
        <View style={flex.center}>
          <Image style={common.logo_center} source={icon} />
        </View>

        <View style={styles.container}>
          <Text style={styles.tilte}>
            Wellcome back! Log in to see and buy sport equipment
          </Text>

          <GooogleSigninButton />

          <OrHr isText />

          <TouchableOpacity
            style={[styles.button, styles.button_primary]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[common.text_white, styles.button_text]}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={common.text_gray}>Don't have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupOption')}>
            <Text style={common.text_link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingHorizontal: 10,
  },
  tilte: {
    fontSize: 28,
    fontWeight: '600',
    width: '100%',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    paddingVertical: 10,
    gap: 12,
    borderWidth: 1,
    width: '100%',
    borderColor: color.border_input,
  },
  button_logo: {
    width: 32,
    height: 32,
  },
  button_text: {
    fontWeight: '500',
    fontSize: 16,
  },
  button_primary: {
    backgroundColor: '#000000',
    paddingVertical: 18,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 26,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
