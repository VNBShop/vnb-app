import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import {google, icon} from '../assets';
import OrHr from '../components/or-hr';

export default function SignupOptionScreen() {
  return (
    <SafeArea>
      <View style={[spec.space_horizontal, common.flex_full]}>
        <View style={flex.center}>
          <TouchableOpacity style={common.position_left}>
            <Text style={[common.text_base, common.text_gray]}>Cancel</Text>
          </TouchableOpacity>
          <Image style={common.logo_center} source={icon} />
        </View>

        <View style={styles.container}>
          <Text style={styles.tilte}>
            Create your account to discover wonderful things
          </Text>

          <TouchableOpacity style={styles.button}>
            <Image source={google} style={styles.button_logo} />
            <Text style={styles.button_text}>Continue with google</Text>
          </TouchableOpacity>

          <OrHr />

          <TouchableOpacity style={[styles.button, styles.button_primary]}>
            <Text style={[common.text_white, styles.button_text]}>
              Create account
            </Text>
          </TouchableOpacity>

          <View>
            <Text style={[common.text_gray, common.des_lineheight]}>
              By signing up, you agree to our
              <Text style={common.text_link}>Term</Text>,{' '}
              <Text style={common.text_link}>Privacy Policy</Text> and{' '}
              <Text style={common.text_link}>Cookies Use</Text>.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={common.text_gray}>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={common.text_link}>Log in</Text>
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
