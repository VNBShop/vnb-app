import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {Image} from 'react-native-animatable';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import useAuth from '../_store/useAuth';
import {icon, password} from '../assets';
import {RootStackProps} from '../types/route';
import {z} from 'zod';
import {loginSchema} from '../libs/validatetions/auth';
import {zodResolver} from '@hookform/resolvers/zod';

type LoginScreenProps = NativeStackScreenProps<RootStackProps, 'Login'>;

type Inputs = z.infer<typeof loginSchema>;

export default function LoginScreen({navigation}: LoginScreenProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const emailRef = React.useRef<TextInput>(null);
  const passwordRef = React.useRef<TextInput>(null);

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {login} = useAuth(state => state);

  const onLogin = (values: Inputs) => {
    console.log('values >>', values);

    login();
  };

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

            <Text style={styles.tip}>
              To get started, first enter your username, password
            </Text>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value, onBlur}}) => (
                  <View>
                    <TextInput
                      ref={emailRef}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      // onChangeText={setEmail}
                      placeholder="Username"
                      autoCapitalize="none"
                      style={styles.input}
                    />
                    {!!errors?.email?.message && (
                      <Text style={styles.error}>{errors?.email?.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value, onBlur}}) => (
                  <View>
                    <View>
                      <TextInput
                        ref={passwordRef}
                        value={value}
                        secureTextEntry={!showPassword}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        style={styles.input}
                        placeholder="Password"
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
                    {!!errors?.password?.message && (
                      <Text style={styles.error}>
                        {errors?.password?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>

          <View style={[styles.footer]}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onLogin)}>
              <Text style={[common.text_base, common.text_white]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={common.text_base}>Forgot password?</Text>
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
  error: {
    color: color.danger,
    marginTop: 8,
  },
});
