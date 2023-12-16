import * as React from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {z} from 'zod';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, flex} from '../UIkit/styles';
import {resetPassword} from '../api/auth/forgot-password';
import {icon} from '../assets';
import InputPassword from '../components/ui/input-password';
import {resetPasswordSchema, signUpSchema} from '../libs/validatetions/auth';
import {DataError, DataResponse} from '../types/auth';
import {RootStackProps} from '../types/route';

type ResetPasswordScreen = NativeStackScreenProps<
  RootStackProps,
  'ResetPassword'
>;

type Inputs = z.infer<typeof resetPasswordSchema>;
export default function ResetPasswordScreen({
  navigation,
  route,
}: ResetPasswordScreen) {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {mutate, isPending} = useMutation<
    DataResponse,
    DataError,
    z.infer<typeof signUpSchema>,
    unknown
  >({
    mutationFn: resetPassword,
    onSuccess(response) {
      if (response?.data?.success) {
        Alert.alert('Reset password successfully!', '', [
          {
            style: 'default',
            onPress: () => navigation.navigate('Login'),
            text: 'Login',
          },
        ]);
      }
    },
  });

  const onSubmit = (values: Inputs) => {
    const payload: z.infer<typeof signUpSchema> = {
      ...values,
      email: route.params.email,
    };
    mutate(payload);
  };

  return (
    <SafeArea color="#ffffff">
      <KeyboardShift keyboardVerticalOffset={20} style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <View style={flex.center}>
              <TouchableOpacity
                disabled={isPending}
                style={common.position_left}
                onPress={() => navigation.goBack()}>
                <Text style={[common.text_base, common.text_gray]}>Cancel</Text>
              </TouchableOpacity>
              <Image style={common.logo_center} source={icon} />
            </View>

            <Text style={styles.tip}>Reset password</Text>

            <View style={styles.form}>
              <Controller
                control={control}
                name="password"
                render={({field: {value, onChange}}) => (
                  <View>
                    <InputPassword
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      placeholder="New password"
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
                render={({field: {value, onChange}}) => (
                  <View>
                    <InputPassword
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      placeholder="Retype new password"
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

          <TouchableOpacity
            disabled={isPending}
            onPress={handleSubmit(onSubmit)}
            style={styles.btn}>
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.btnText}>Reset</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardShift>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
  input: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.divider,
  },
  btn: {
    borderRadius: 9999,
    backgroundColor: color.primary,
    alignItems: 'center',
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: color.white,
  },
  error: {
    color: color.danger,
    marginTop: 8,
  },
});
