import {WEB_CLIENT_ID} from '@env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {color} from '../UIkit/palette';
import {googleLogin} from '../api/auth/login';
import {google} from '../assets';
import useAuth from '../_store/useAuth';
import useLoading from '../_store/useLoading';

export default function GooogleSigninButton() {
  const {login: setLogin} = useAuth(state => state);
  const {setLoading} = useLoading();
  const signIn = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const userInfo = await GoogleSignin.signIn();

      const verifyWithBE = await googleLogin({
        idToken: userInfo?.idToken ?? '',
        platform: 'WEB',
      });

      if (verifyWithBE?.data?.success) {
        setLogin(verifyWithBE?.data?.metadata);
        return;
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log('Google login error: ', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  return (
    <TouchableOpacity style={styles.button} onPress={signIn}>
      <Image source={google} style={styles.button_logo} />
      <Text style={styles.button_text}>Continue with google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    paddingVertical: 10,
    gap: 12,
    borderWidth: 1,
    width: '100%',
    borderColor: color.border_input,
  },
  button_logo: {
    width: 32,
    height: 32,
  },
  button_text: {
    fontWeight: '500',
    fontSize: 16,
  },
});
