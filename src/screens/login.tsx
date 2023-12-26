import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';
import {Image} from 'react-native-animatable';
import {z} from 'zod';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import useAuth from '../_store/useAuth';
import {login} from '../api/auth/login';
import {icon} from '../assets';
import {loginSchema} from '../libs/validatetions/auth';
import {AuthProps, DataError, DataResponse} from '../../types/auth';
import {RootStackProps} from '../../types/route';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import {InputOtp} from '../components/ui/input-otp';
import {OTPPayloadProps, confirmOTP} from '../api/auth/otp';
import InputPassword from '../components/ui/input-password';

type LoginScreenProps = NativeStackScreenProps<RootStackProps, 'Login'>;

type Inputs = z.infer<typeof loginSchema>;

export default function LoginScreen({navigation}: LoginScreenProps) {
  const verifyModalRef = React.useRef<Modalize>(null);
  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {login: setLogin} = useAuth(state => state);

  const mutationLogin = useMutation<
    DataResponse<AuthProps>,
    DataError,
    Inputs,
    unknown
  >({
    mutationFn: login,
    onSuccess(res) {
      if (res.data.success) {
        setLogin(res?.data?.metadata);
        reset();
      }
    },
    onError: error => {
      if (
        error?.response?.data?.metadata?.message?.includes(
          'Your account must be verify',
        )
      ) {
        Alert.alert('Error', error?.response?.data?.metadata?.message ?? '', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Verify',
            onPress: () => verifyModalRef.current?.open?.(),
            style: 'destructive',
          },
        ]);
      } else {
        Alert.alert('Error', error?.response?.data?.metadata?.message ?? '', [
          {
            text: 'Try again',
            style: 'cancel',
          },
        ]);
      }
    },
  });

  const mutationVerify = useMutation<
    DataResponse,
    DataError,
    OTPPayloadProps,
    unknown
  >({
    mutationFn: confirmOTP,
    onSuccess: response => {
      if (response.data.success) {
        verifyModalRef.current?.close();
        Alert.alert('Success', 'Verify account successfully!', [
          {
            text: 'Login',
            style: 'default',
            onPress: () => {
              handleSubmit(onLogin)();
            },
          },
        ]);
      }
    },
    onError: error => {
      Alert.alert('Error', error?.response?.data?.metadata?.message ?? '', [
        {
          text: 'Try again',
          style: 'cancel',
        },
      ]);
    },
  });

  const onLogin = (values: Inputs) => {
    mutationLogin.mutate(values);
  };

  const onSubmitVerify = (otp: string) => {
    const payload: OTPPayloadProps = {
      email: getValues('email'),
      otpCode: otp,
      type: 'REGISTER',
    };

    mutationVerify.mutate(payload);
  };

  return (
    <>
      <SafeArea color="#ffffff">
        <KeyboardShift>
          <View style={styles.container}>
            <View style={spec.space_horizontal}>
              <View style={flex.center}>
                <TouchableOpacity
                  style={common.position_left}
                  onPress={() => navigation.goBack()}>
                  <Text style={[common.text_base, common.text_gray]}>
                    Cancel
                  </Text>
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
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Email address"
                        autoCapitalize="none"
                        style={styles.input}
                      />
                      {!!errors?.email?.message && (
                        <Text style={styles.error}>
                          {errors?.email?.message}
                        </Text>
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
                        <InputPassword
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize="none"
                          style={styles.input}
                          placeholder="Password"
                        />
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
                disabled={mutationLogin.isPending}
                style={styles.button}
                onPress={handleSubmit(onLogin)}>
                {mutationLogin.isPending ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={[common.text_base, common.text_white]}>
                    Login
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={common.text_base}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardShift>
      </SafeArea>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          closeOnOverlayTap={false}
          adjustToContentHeight
          // modalHeight={270}
          ref={verifyModalRef}
          HeaderComponent={
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Verify account</Text>

              <Text style={styles.modalTip}>
                We just sent OTP to{' '}
                <Text style={styles.modalEmail}>{getValues('email')}</Text>
              </Text>
            </View>
          }>
          <View style={styles.otpContainer}>
            <View style={styles.loading}>
              {mutationVerify.isPending && (
                <ActivityIndicator color={color.secondary} />
              )}
            </View>
            <InputOtp onSubmit={onSubmitVerify} />

            <BottomSafeArea />
          </View>
        </Modalize>
      </Portal>
    </>
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
    marginTop: 8,
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
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  error: {
    color: color.danger,
    marginTop: 8,
  },
  modalHeader: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalTip: {
    marginTop: 16,
    color: color.gray,
  },
  modalEmail: {
    color: color.secondary,
  },
  otpContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    paddingRight: 8,
  },
});
