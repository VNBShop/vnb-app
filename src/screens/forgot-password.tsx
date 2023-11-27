import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Image} from 'react-native-animatable';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import {icon} from '../assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../types/route';

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ForgotPassword'
>;

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  return (
    <SafeArea color="#ffffff">
      <KeyboardShift>
        <View style={styles.container}>
          <View style={spec.space_horizontal}>
            <View style={flex.center}>
              <TouchableOpacity
                style={common.position_left}
                onPress={() => navigation.goBack()}>
                <Text style={[common.text_base, common.text_gray]}>Cancel</Text>
              </TouchableOpacity>
              <Image style={common.logo_center} source={icon} />
            </View>

            <Text style={styles.tip}>Find your VNB account</Text>

            <Text style={[common.text_gray, spec.mt_xl, common.des_lineheight]}>
              Enter your username, phone number or email address with your
              account to change your password
            </Text>

            <View style={styles.form}>
              <TextInput
                // ref={emailRef}
                // onFocus={() => setIsInputFocus('email')}
                // onBlur={() => setIsInputFocus(null)}
                // onChangeText={setEmail}
                placeholder="Username, phone number or email address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          <View style={[styles.footer]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Identify')}>
              <Text style={[common.text_base, common.text_white]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardShift>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  tip: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 32,
  },
  form: {
    marginVertical: 40,
    flexDirection: 'column',
    gap: 48,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
  input: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.divider,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  button: {
    borderRadius: 9999,
    backgroundColor: color.primary,
    alignItems: 'center',
    padding: 12,
    paddingVertical: 8,
  },
});
