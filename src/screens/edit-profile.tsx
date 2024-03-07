import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {z} from 'zod';
import SafeArea from '../UIkit/layouts/safe-area';
import {back} from '../assets';
import Box from '../components/ui/box';
import {Icon} from '../components/ui/icon';
import {UpdateProfileSchema} from '../libs/validatetions/user';
import {zodResolver} from '@hookform/resolvers/zod';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE} from '../UIkit/styles';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

type Inputs = z.infer<typeof UpdateProfileSchema>;

export default function EditProfileScreen() {
  const [open, setOpen] = React.useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
    },
  });
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon icon={back} size={25} />

          <Text style={styles.title}>Edit profile</Text>

          <Box width={25} />
        </View>

        <View style={styles.form}>
          <View style={styles.sectionD}>
            <Controller
              control={form.control}
              name="firstName"
              render={({field: {value, onChange}}) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="First name"
                  style={[styles.control, styles.itemD]}
                />
              )}
            />

            <Controller
              control={form.control}
              name="lastName"
              render={({field: {value, onChange}}) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Last name"
                  style={[styles.control, styles.itemD]}
                />
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
                    {value
                      ? dayjs(value).format('DD/MM/YYYY')
                      : 'Date of birth'}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open}
                  date={value}
                  onConfirm={date => {
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

          <View />
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
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
