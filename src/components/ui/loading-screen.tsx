import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {color} from '../../UIkit/palette';
import {icon} from '../../assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useLoading from '../../_store/useLoading';

type LoadingScreenProps = {
  description?: string;
};
export default function LoadingScreen({description}: LoadingScreenProps) {
  const insets = useSafeAreaInsets();
  const {loading} = useLoading();

  return (
    <Modal animationType="slide" visible={loading} transparent>
      <View style={styles.container}>
        <Image source={icon} style={styles.logo} />

        <View>
          {!!description && <Text style={styles.text}>{description}</Text>}
          <ActivityIndicator size="large" />
        </View>

        <View style={[styles.from, {bottom: insets.bottom}]}>
          <Text style={styles.text1}>from</Text>
          <Text style={styles.text2}>VNB Software Team</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    backgroundColor: color.white,
    marginTop: -200,
  },
  logo: {
    width: 50,
    height: 50,
  },
  from: {
    position: 'absolute',
  },
  text: {
    marginBottom: 16,
    fontSize: 16,
  },
  text1: {
    textAlign: 'center',
    fontSize: 15,
  },
  text2: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 4,
  },
});
