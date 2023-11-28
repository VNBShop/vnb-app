import * as React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {back, heart, photo} from '../assets';
import {Icon} from '../components/ui/icon';
import {flex} from '../UIkit/styles';
import Avatar from '../components/ui/avatar';
import {color} from '../UIkit/palette';
import KeyboardShift from '../UIkit/layouts/keyboard-shift';

export default function ConversationDetailScreen() {
  return (
    <KeyboardShift>
      <SafeArea>
        <View style={styles.header}>
          <View style={flex.flex_row}>
            <Icon icon={back} size={25} />
            <Avatar
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1695303196/berreck_i387ac.jpg'
              }
              size={40}
              username="D"
              isActive
            />
            <View>
              <Text style={styles.name}>Dzung</Text>
              <Text style={styles.active}>Active now</Text>
            </View>
          </View>
        </View>

        <View style={styles.messContainer}>
          <ScrollView />
        </View>

        <View style={styles.footer}>
          <Icon size={32} icon={photo} />
          <TextInput style={styles.textInput} placeholder="Aa" />
          <Icon size={30} icon={heart} />
        </View>
      </SafeArea>
    </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  active: {
    fontSize: 12,
    marginTop: 2,
    color: color.gray,
  },
  messContainer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: color.divider,
    paddingHorizontal: 16,
    borderRadius: 9999,
    paddingVertical: 8,
    fontSize: 16,
  },
});
