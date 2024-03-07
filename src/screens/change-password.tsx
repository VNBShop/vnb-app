/* eslint-disable react-native/no-inline-styles */
import {API_URL} from '@env';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
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
import useAxiosPrivate from '../api/private/hook/useAxiosPrivate';
import {icon} from '../assets';
import InputPassword from '../components/ui/input-password';
import {changePasswordSchema} from '../libs/validatetions/auth';
import {DataError, DataResponse} from '../../types/auth';
import {RootStackProps} from '../../types/route';

type ChangePasswordScreenProps = NativeStackScreenProps<
  RootStackProps,
  'ChangePassword'
>;

type Inputs = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordScreen({
  navigation,
}: ChangePasswordScreenProps) {
  const axios = useAxiosPrivate();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {isPending, mutate} = useMutation<
    DataResponse,
    DataError,
    Inputs,
    unknown
  >({
    mutationFn: payload => {
      const res = axios.put(`${API_URL}/account/change-password`, payload);
      return res;
    },
    onSuccess: response => {
      if (response.data.success) {
        Alert.alert('Change password successfully!', '', [
          {
            text: 'Done',
            style: 'default',
            onPress: () => navigation.goBack(),
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
    mutate(values);
  };

  return (
    <SafeArea color="#ffffff">
      <KeyboardShift>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
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

                <Text style={styles.tip}>Change password</Text>

                <View style={styles.form}>
                  <Controller
                    control={control}
                    name="oldPassword"
                    render={({field: {onChange, value}}) => (
                      <View>
                        <InputPassword
                          value={value}
                          onChangeText={onChange}
                          placeholder="Current password"
                          autoCapitalize="none"
                          style={styles.input}
                        />
                        <Text style={styles.error}>
                          {errors?.oldPassword?.message}
                        </Text>
                      </View>
                    )}
                  />

                  <Controller
                    control={control}
                    name="newPassword"
                    render={({field: {onChange, value}}) => (
                      <View>
                        <InputPassword
                          value={value}
                          onChangeText={onChange}
                          placeholder="New password"
                          autoCapitalize="none"
                          style={styles.input}
                        />
                        <Text style={styles.error}>
                          {errors?.newPassword?.message}
                        </Text>
                      </View>
                    )}
                  />

                  <Controller
                    control={control}
                    name="confirmNewPassword"
                    render={({field: {onChange, value}}) => (
                      <View>
                        <InputPassword
                          value={value}
                          onChangeText={onChange}
                          placeholder="Retype new password"
                          autoCapitalize="none"
                          style={styles.input}
                        />
                        <Text style={styles.error}>
                          {errors?.confirmNewPassword?.message}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={[styles.footer]}>
            <TouchableOpacity
              disabled={isPending}
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              {isPending ? (
                <ActivityIndicator />
              ) : (
                <Text style={[common.text_base, common.text_white]}>
                  Change password
                </Text>
              )}
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
    flex: 1,
  },
  input: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.divider,
  },
  footer: {
    gap: 24,
    position: 'absolute',
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
