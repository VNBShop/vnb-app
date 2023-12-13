import * as React from 'react';
import {
  Keyboard,
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

type ChangePasswordScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ChangePassword'
>;

export default function ChangePasswordScreen({
  navigation,
}: ChangePasswordScreenProps) {
  // const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isInputFocus, setIsInputFocus] = React.useState<string | null>(null);

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (!isInputFocus) {
          Keyboard.dismiss();
        }
      },
    );

    return () => keyboardDidHideListener.remove();
  }, [isInputFocus]);

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

            <Text style={styles.tip}>Change password</Text>

            <View style={styles.form}>
              <TextInput
                ref={emailRef}
                onFocus={() => setIsInputFocus('email')}
                onBlur={() => setIsInputFocus(null)}
                // onChangeText={setEmail}
                placeholder="New password"
                autoCapitalize="none"
                style={styles.input}
              />

              <View>
                <TextInput
                  ref={passwordRef}
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  onFocus={() => setIsInputFocus('password')}
                  onBlur={() => setIsInputFocus(null)}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Confirm new password"
                />
                {password && password.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setShowPassword(prev => !prev)}>
                    {/* {showPassword ? (
                              <Icon name="eye" size={24} color="black" />
                            ) : (
                              <Icon name="eye-off" size={24} color="black" />
                            )} */}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View style={[styles.footer]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Root');
              }}>
              <Text style={[common.text_base, common.text_white]}>Confirm</Text>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
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
    padding: 16,
    width: '100%',
  },
});
