import * as React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {icon, wellcome} from '../assets';
import {box, common, spec} from '../UIkit/styles';
import {color} from '../UIkit/palette';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../types/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function WellcomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackProps, 'Login'>>();

  return (
    <SafeAreaView style={[box.container]}>
      <View style={[spec.space_horizontal]}>
        <Image source={icon} style={common.logo} />
      </View>

      <View style={[spec.space_horizontal, styles.paragraph]}>
        <Text style={styles.title}>Enjoy shopping with</Text>
        <Text style={styles.spec}>VNB Shop</Text>

        <Text style={[styles.paragraph, styles.des]}>
          VNB Shop is a platform that helps you to buy and sell your products
          online
        </Text>

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

            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Go to shopping</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 60,
    borderRadius: 55,
  },
  button_text: {
    color: '#ffffff',
    fontSize: 18,
  },
});
