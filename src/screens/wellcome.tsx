import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {common, spec} from '../UIkit/styles';
import {icon, wellcome} from '../assets';
import {RootStackProps} from '../types/route';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';

export default function WellcomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'LoginOption'>>();

  return (
    <SafeArea>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={[spec.space_horizontal]}>
        <Image source={icon} style={common.logo} />
      </View>

      <View style={[spec.space_horizontal]}>
        <Text style={styles.title}>Enjoy shopping with</Text>
        <Text style={styles.spec}>VNB Shop</Text>

        <Text style={[styles.paragraph, styles.des]}>
          VNB Shop is a platform that helps you to buy and sell your products
          online
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('LoginOption')}
          style={styles.button}>
          <Text style={styles.button_text}>Go to shopping</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.circle_1} />
          <View style={styles.circle_2} />

          <View style={styles.container}>
            <Animatable.Image
              animation="bounceIn"
              easing={'ease-in'}
              source={wellcome}
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <BottomSafeArea />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: 'gray',
  },
  spec: {
    color: color.secondary,
    fontSize: 40,
    fontWeight: '600',
  },
  des: {
    color: '#3c6027',
    fontSize: 16,
  },
  circle_1: {
    width: 400,
    height: 400,
    borderRadius: 99999,
    backgroundColor: '#24afc1',
    position: 'absolute',
    bottom: 0,
    right: -100,
  },
  circle_2: {
    width: 400,
    height: 400,
    borderRadius: 99999,
    backgroundColor: '#fccf47',
    position: 'absolute',
    bottom: -240,
    left: -200,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 50,
  },
  image: {
    width: 420,
    height: 370,
    objectFit: 'cover',
  },
  button: {
    backgroundColor: color.primary,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 55,
    alignSelf: 'flex-start',
    marginTop: 32,
  },
  button_text: {
    color: '#ffffff',
    fontSize: 18,
  },
});
