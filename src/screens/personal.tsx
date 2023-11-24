import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {WIDTH_DEVICE, common, flex} from '../UIkit/styles';
import {forwardGray, search, setting} from '../assets';
import Avatar from '../components/ui/avatar';
import {Icon, IconOutline} from '../components/ui/icon';
import OrHr from '../components/ui/or-hr';
import {actionOption, navPerson} from '../utils/contants';

export default function PersonalScreen() {
  return (
    <SafeArea color={color.superDivider}>
      <View style={styles.container}>
        <ScrollView>
          <View style={flex.between}>
            <Text style={styles.title}>Account</Text>

            <View style={styles.headerAction}>
              <IconOutline icon={setting} size={32} />
              <IconOutline icon={search} size={32} />
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.infoL}>
              <Avatar
                source={
                  'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
                }
                size={50}
                username="D"
              />

              <View>
                <Text style={styles.name}>Dzung</Text>
                <Text style={styles.username}>@jungjung261</Text>
              </View>
            </View>

            <Icon icon={forwardGray} size={22} />
          </View>

          <View style={styles.navContainer}>
            {navPerson.map(nav => (
              <TouchableOpacity key={nav.id} style={styles.navItem}>
                <View style={styles.navIcon}>
                  <Icon icon={nav.logo} size={24} />
                </View>
                <Text style={[common.text_gray, common.fz13]}>{nav.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionContainer}>
            {actionOption.map(item => (
              <React.Fragment key={item.id}>
                <TouchableOpacity style={styles.actionItem}>
                  <View style={styles.actionItemL}>
                    <View
                      style={[
                        styles.iconWrapper,
                        {backgroundColor: item.bgColor},
                      ]}>
                      <Image source={item.icon} style={styles.icon} />
                    </View>

                    <Text style={styles.label}>{item.label}</Text>
                  </View>

                  <Icon icon={forwardGray} size={20} />
                </TouchableOpacity>

                {actionOption[actionOption.length - 1] !== item && <OrHr />}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  headerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    padding: 12,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
    marginTop: 16,
  },
  infoL: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    color: color.gray,
    marginTop: 4,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  navItem: {
    width: (WIDTH_DEVICE - 56) / 4,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 50,
    height: 50,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
  },
  actionContainer: {
    marginTop: 24,
    backgroundColor: color.white,
    borderRadius: 8,
    shadowColor: color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.07,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  actionItemL: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: 16,
  },
});
