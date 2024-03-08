/* eslint-disable react-hooks/exhaustive-deps */
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {z} from 'zod';
import {RootStackProps} from '../../types/route';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common} from '../UIkit/styles';
import {back} from '../assets';
import Box from '../components/ui/box';
import {Icon} from '../components/ui/icon';
import RadioCard from '../components/ui/radio-card';
import {UpdateProfileSchema} from '../libs/validatetions/user';
import useUpdateUser, {UpdateUserPayload} from '../hooks/user/useUpdateUser';

type Inputs = z.infer<typeof UpdateProfileSchema>;

type IProps = NativeStackScreenProps<RootStackProps, 'UpdateProfile'>;

export default function EditProfileScreen({route, navigation}: IProps) {
  const [open, setOpen] = React.useState(false);

  const user = route?.params?.user;

  const {loading, onUpdateInfo} = useUpdateUser({
    onSuccess: () => {
      navigation.goBack();
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      // dateOfBirth: new Date(),
    },
  });

  const onSubmit = (values: Inputs) => {
    const payload: UpdateUserPayload = {
      ...values,
      gender: values?.gender as UpdateUserPayload['gender'],
    };
    onUpdateInfo(payload);
  };

  React.useEffect(() => {
    if (Object.keys(user ?? {})?.length) {
      form.setValue('firstName', user?.firstName ?? '');
      form.setValue('lastName', user?.lastName ?? '');
      form.setValue('address', user?.address ?? '');
      form.setValue('phoneNumber', user?.phoneNumber ?? '');
      form.setValue('gender', user?.gender ?? '');

      if (user?.dateOfBirth) {
        const formattedDate = dayjs(user.dateOfBirth).toDate();
        form.setValue('dateOfBirth', formattedDate);
      }
    }
  }, [JSON?.stringify(user)]);

  return (
    <KeyboardShift keyboardVerticalOffset={20}>
      <SafeArea>
        <ScrollView contentContainerStyle={common.flex_full}>
          <View style={styles.container}>
            <View>
              <View style={styles.header}>
                <Icon
                  icon={back}
                  size={25}
                  onPress={() => {
                    if (!loading) {
                      navigation.goBack();
                    }
                  }}
                />

                <Text style={styles.title}>Edit profile</Text>

                <Box width={25} />
              </View>

              <View style={styles.form}>
                <View style={styles.sectionD}>
                  <Controller
                    control={form.control}
                    name="firstName"
                    render={({field: {value, onChange}}) => (
                      <View>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="First name"
                          style={[styles.control, styles.itemD]}
                        />
                        {!!form?.formState?.errors?.firstName?.message && (
                          <Text style={styles.err}>
                            {form?.formState?.errors?.firstName?.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="lastName"
                    render={({field: {value, onChange}}) => (
                      <View>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Last name"
                          style={[styles.control, styles.itemD]}
                        />
                        {!!form?.formState?.errors?.lastName?.message && (
                          <Text style={styles.err}>
                            {form?.formState?.errors?.lastName?.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>

                <Controller
                  control={form.control}
                  name="phoneNumber"
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Phone number"
                      style={[styles.control]}
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name="dateOfBirth"
                  render={({field: {value, onChange}}) => (
                    <>
                      <TouchableOpacity
                        style={styles.control}
                        onPress={() => setOpen(true)}>
                        <Text>
                          {value ? (
                            dayjs(value).format('DD/MM/YYYY')
                          ) : (
                            <Text style={styles.datepickertext}>
                              {' '}
                              Date of birth
                            </Text>
                          )}
                        </Text>
                      </TouchableOpacity>
                      <DatePicker
                        modal
                        open={open}
                        date={value || new Date()}
                        onConfirm={date => {
                          console.log('date', date);

                          setOpen(false);
                          onChange(date);
                        }}
                        mode="date"
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                    </>
                  )}
                />

                <Controller
                  control={form.control}
                  name="address"
                  render={({field: {value, onChange}}) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Address"
                      style={[styles.control]}
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name="gender"
                  render={({field: {value}}) => (
                    <View style={styles.genderForm}>
                      <TouchableOpacity
                        onPress={() => form.setValue('gender', 'MALE')}
                        style={[
                          {
                            borderColor:
                              value === 'MALE' ? color.link : color.gray,
                          },
                        ]}>
                        <RadioCard
                          isAcive={value === 'MALE' ? true : false}
                          label={'Male'}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => form.setValue('gender', 'FEMALE')}
                        style={[
                          {
                            borderColor:
                              value === 'FEMALE' ? color.link : color.gray,
                          },
                        ]}>
                        <RadioCard
                          isAcive={value === 'FEMALE' ? true : false}
                          label={'Female'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />

                <View />
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.btn}
                disabled={loading}
                onPress={form.handleSubmit(onSubmit)}>
                {loading && <ActivityIndicator />}
                <Text style={styles.btnText}> Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeArea>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  err: {
    marginTop: 4,
    color: color.danger,
  },
  genderForm: {
    flexDirection: 'row',
    columnGap: 50,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
  },
  btn: {
    paddingVertical: 14,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 16,
    left: 0,
  },
  datepickertext: {
    color: '#c4c8cc',
  },
  sectionD: {
    flexDirection: 'row',
    columnGap: 32,
  },
  itemD: {
    width: (WIDTH_DEVICE - 92) / 2,
  },
  control: {
    borderBottomWidth: 0.7,
    borderBottomColor: color.border_input,
    paddingVertical: 8,
  },
  form: {
    marginTop: 32,
    gap: 53,
    paddingHorizontal: 16,
  },
  container: {
    paddingHorizontal: 16,
    position: 'relative',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
