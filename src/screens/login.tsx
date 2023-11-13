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
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {box, common, flex, spec} from '../UIkit/styles';
import {icon} from '../assets';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';

export default function LoginScreen() {
  // const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isInputFocus, setIsInputFocus] = React.useState<string | null>(null);

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  // const handleLogin = async () => {
  //   if (email.length === 0) {
  //     Alert.alert('Email is required', 'Please enter your email to continue');
  //     emailRef?.current?.focus();
  //     return;
  //   }

  //   if (password.length === 0) {
  //     Alert.alert(
  //       'Password is required',
  //       'Please enter your password to continue',
  //     );
  //     passwordRef?.current?.focus();
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       'http://localhost:8080/api/vnb/v1/auth/login',
  //       {
  //         email,
  //         password,
  //       },
  //     );
  //     await dispatch(setUser(res?.data?.metadata));
  //     setLoading(false);
  //   } catch (error: any) {
  //     setLoading(false);
  //     Alert.alert('Wrong Credentials', error?.response?.data?.message);
  //   }
  // };

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
      <KeyboardShift style={[box.container, spec.space_horizontal]}>
        <View style={flex.center}>
          <TouchableOpacity style={common.position_left}>
            <Text style={[common.text_base, common.text_gray]}>Cancel</Text>
          </TouchableOpacity>
          <Image style={common.logo_center} source={icon} />
        </View>

        <Text style={styles.tip}>
          To get started, first enter your username, password
        </Text>

        <View style={styles.form}>
          <TextInput
            ref={emailRef}
            onFocus={() => setIsInputFocus('email')}
            onBlur={() => setIsInputFocus(null)}
            // onChangeText={setEmail}
            placeholder="Username"
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
              placeholder="Password"
            />
            {password && password.length > 0 && (
              <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                {/* {showPassword ? (
                        <Icon name="eye" size={24} color="black" />
                      ) : (
                        <Icon name="eye-off" size={24} color="black" />
                      )} */}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardShift>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  tip: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
  },
  form: {
    marginVertical: 32,
    flexDirection: 'column',
    gap: 32,
  },
  input: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.divider,
  },
});
