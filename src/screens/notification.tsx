import * as React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {common, flex} from '../UIkit/styles';
import {ellipsisBlack, filter, icon, search_gray} from '../assets';
import {Icon, IconOutline} from '../components/ui/icon';
import SafeArea from '../UIkit/layouts/safe-area';
import Avatar from '../components/ui/avatar';
import {color} from '../UIkit/palette';

export default function NotificationScreen() {
  return (
    <SafeArea>
      <View style={styles.header}>
        <Text style={common.titleLeft}>Notification</Text>

        <View style={flex.flex_row}>
          <IconOutline icon={filter} size={35} />
          <IconOutline icon={search_gray} size={35} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.textTitle}>All</Text>

        <View style={styles.notifyContainer}>
          <View style={[styles.notifyItem, styles.notRead]}>
            <Avatar size={50} source={icon} username="VNB" />

            <Text style={styles.notifyContent} numberOfLines={2}>
              Your product has been processing by{' '}
              <Text style={common.fontBase}>admin</Text>, please check your
              phone, we will call you to confirm ordered
            </Text>

            <Icon icon={ellipsisBlack} size={35} />
          </View>

          <View style={styles.notifyItem}>
            <Avatar
              size={50}
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1693791342/j2d6vpciwkyx1viznov0.jpg'
              }
              username="VNB"
            />

            <Text style={styles.notifyContent} numberOfLines={2}>
              <Text style={common.fontBase}>Taroa</Text> has been commented on
              your post: You are the best on my mind
            </Text>

            <Icon icon={ellipsisBlack} size={35} />
          </View>

          <View style={[styles.notifyItem, styles.notRead]}>
            <Avatar
              size={50}
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
              }
              username="VNB"
            />

            <Text style={styles.notifyContent} numberOfLines={2}>
              <Text style={common.fontBase}>Meow Meow</Text> has been commented
              on your post: Well, that is nice racket, your
            </Text>

            <Icon icon={ellipsisBlack} size={35} />
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
  notifyContainer: {
    marginTop: 16,
  },
  notifyItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  notRead: {
    backgroundColor: color.divider,
  },
  notifyContent: {
    flex: 1,
    lineHeight: 22,
  },
});
