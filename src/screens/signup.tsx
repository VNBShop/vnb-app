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
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {z} from 'zod';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import {OTPPayloadProps, confirmOTP} from '../api/auth/otp';
import signUp from '../api/auth/signup';
import {icon} from '../assets';
import {InputOtp} from '../components/ui/input-otp';
import {signUpSchema} from '../libs/validatetions/auth';
import {DataError, DataResponse} from '../../types/auth';
import {RootStackProps} from '../../types/route';
import InputPassword from '../components/ui/input-password';
import ResendOTP from '../components/resend-otp';

type SignupScreenProps = NativeStackScreenProps<RootStackProps, 'Signup'>;

type Inputs = z.infer<typeof signUpSchema>;
export default function SignupScreen({navigation}: SignupScreenProps) {
  const verifyModalRef = React.useRef<Modalize>(null);

  const {
    control,
    formState: {errors},
    reset,
    getValues,
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutationSignIn = useMutation<DataResponse, DataError, Inputs, unknown>({
    mutationFn: signUp,
    onSuccess(res) {
      if (res.data.success) {
        verifyModalRef.current?.open();
      }
    },
    onError(error) {
      Alert.alert('Error', error?.response?.data?.metadata?.message ?? '', [
        {
          text: 'Try again',
          style: 'cancel',
        },
      ]);
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
        Alert.alert('Success', 'Create account successfully!', [
          {
            text: 'Login',
            style: 'default',
            onPress: () => {
              reset();
              navigation.navigate('Login');
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

  const onSubmit = (values: Inputs) => {
    mutationSignIn.mutate(values);
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

              <Text style={styles.tip}>Create your account</Text>

              <View style={styles.form}>
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, value}}) => (
                    <View>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Email"
                        autoCapitalize="none"
                        style={styles.input}
                      />
                      <Text style={styles.error}>{errors?.email?.message}</Text>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, value}}) => (
                    <View>
                      <InputPassword
                        value={value}
                        onChangeText={onChange}
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry={false}
                        style={styles.input}
                      />
                      <Text style={styles.error}>
                        {errors?.password?.message}
                      </Text>
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({field: {onChange, value}}) => (
                    <View>
                      <InputPassword
                        value={value}
                        onChangeText={onChange}
                        placeholder="Retype password"
                        autoCapitalize="none"
                        secureTextEntry={false}
                        style={styles.input}
                      />
                      <Text style={styles.error}>
                        {errors?.confirmPassword?.message}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>

            <View style={[styles.footer]}>
              <TouchableOpacity
                disabled={mutationSignIn.isPending}
                style={styles.button}
                onPress={handleSubmit(onSubmit)}>
                {mutationSignIn.isPending ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={[common.text_base, common.text_white]}>
                    Create account
                  </Text>
                )}
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

            <ResendOTP email={getValues('email')} type="REGISTER" />

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
    justifyContent: 'center',
    gap: 8,
  },
  error: {
    marginTop: 8,
    color: color.danger,
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
