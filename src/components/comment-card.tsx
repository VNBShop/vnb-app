import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-animatable';
import {color} from '../UIkit/palette';

export default function CommentCard() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avt}>
          <Text style={styles.textAvt}>D</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.auth}>Dzung</Text>
          <Text style={styles.comment}>
            This is the best racket I ever used
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.avt}>
          <Text style={styles.textAvt}>D</Text>
        </View>

        <View style={styles.containerContent}>
          <View style={styles.content}>
            <Text style={styles.auth}>Khang Leo</Text>
            <Text style={styles.comment}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
  },
  avt: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  textAvt: {
    color: '#ffffff',
    fontSize: 22,
  },
  containerContent: {
    flex: 1,
  },
  content: {
    backgroundColor: color.superDivider,
    padding: 6,
    borderRadius: 16,
    paddingHorizontal: 12,
    width: 'auto',
    alignSelf: 'stretch',
  },
  auth: {
    fontWeight: '500',
  },
  comment: {
    lineHeight: 24,
    fontWeight: '300',
  },
});
