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

import {Image} from 'react-native-animatable';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex, spec} from '../UIkit/styles';
import {icon} from '../assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackProps} from '../../types/route';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {forgotPassSchema} from '../libs/validatetions/auth';
import {useMutation} from '@tanstack/react-query';
import {forgotPassword} from '../api/auth/forgot-password';
import {DataResponse, DataError} from '../../types/auth';
import {z} from 'zod';
import {InputOtp} from '../components/ui/input-otp';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {OTPPayloadProps, confirmOTP} from '../api/auth/otp';
import ResendOTP from '../components/resend-otp';

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ForgotPassword'
>;

type Inputs = z.infer<typeof forgotPassSchema>;

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const verifyModalRef = React.useRef<Modalize>(null);

  const {
    getValues,
    formState: {errors},
    control,
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutationFindAccount = useMutation<
    DataResponse,
    DataError,
    Inputs,
    unknown
  >({
    mutationFn: forgotPassword,
    onSuccess: response => {
      if (response.data.success) {
        verifyModalRef.current?.open?.();
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

  const mutationVerify = useMutation<
    DataResponse,
    DataError,
    OTPPayloadProps,
    unknown
  >({
    mutationFn: confirmOTP,
    onSuccess: (response, data) => {
      if (response.data.success) {
        verifyModalRef.current?.close();
        Alert.alert('Verify account successfully!', '', [
          {
            text: 'Reset password',
            style: 'default',
            onPress: () =>
              navigation.navigate('ResetPassword', {
                email: data.email,
              }),
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
    mutationFindAccount.mutate(values);
  };

  const onSubmitVerify = (otp: string) => {
    const payload: OTPPayloadProps = {
      email: getValues('email'),
      otpCode: otp,
      type: 'RESET_PASSWORD',
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

              <Text style={styles.tip}>Find your VNB account</Text>

              <Text
                style={[common.text_gray, spec.mt_xl, common.des_lineheight]}>
                Enter your email address with your account to change your
                password
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
              </View>
            </View>

            <View style={[styles.footer]}>
              <TouchableOpacity
                disabled={mutationFindAccount.isPending}
                style={styles.button}
                onPress={handleSubmit(onSubmit)}>
                {mutationFindAccount.isPending ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={[common.text_base, common.text_white]}>
                    Next
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

            <ResendOTP email={getValues('email')} type="RESET_PASSWORD" />

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
