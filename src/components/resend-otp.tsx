/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../UIkit/palette';
import useResendOTP from '../hooks/user/useResendOTP';

type IProps = {
  email: string;
  type: 'REGISTER' | 'RESET_PASSWORD';
};

export default function ResendOTP({type, email}: IProps) {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const {loading, onResendOTP} = useResendOTP({
    onSuccess() {
      setMinutes(1);
      setSeconds(30);
    },
  });

  const onResend = () => {
    const payload = {
      email,
      type,
    };

    onResendOTP(payload);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  return (
    <View
      style={{
        marginVertical: 32,
      }}>
      {seconds > 0 || minutes > 0 ? (
        <Text
          style={{
            color: color.gray,
          }}>
          OTP remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}>
          <Text
            style={{
              color: color.gray,
            }}>
            Didn&apos;t recieve code?
          </Text>
          <TouchableOpacity
            style={{
              marginLeft: 4,
            }}
            disabled={loading}
            onPress={onResend}>
            {!loading ? (
              <Text style={{color: color.secondary}}>Resend</Text>
            ) : (
              <ActivityIndicator />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
