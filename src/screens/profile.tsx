/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackProps} from '../../types/route';
import SafeArea from '../UIkit/layouts/safe-area';
import {color} from '../UIkit/palette';
import {HEIGHT_DEVICE, common} from '../UIkit/styles';
import {back, search_gray} from '../assets';
import ProfileSkeleton from '../components/skeleton/profile-skeleton';
import {Icon, IconOutline} from '../components/ui/icon';
import Post from '../components/post/post-item';

type ProfileScreenProps = NativeStackScreenProps<RootStackProps, 'Profile'>;

export default function ProfileScreen({navigation}: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const commentModalRef = React.useRef<Modalize>(null);

  return (
    <>
      <SafeArea>
        <View style={styles.header}>
          <Icon size={25} icon={back} onPress={() => navigation.goBack()} />
          <Text style={styles.headerUsername}>Dzung</Text>
          <IconOutline size={36} icon={search_gray} />
        </View>

        <View style={common.flex_full}>
          <ScrollView nestedScrollEnabled>
            {/* <View style={styles.userContainer}>
              <View style={styles.userHead}>
                <View style={styles.avt}>
                  <Avatar
                    source={
                      'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
                    }
                    size={90}
                    username="D"
                  />

                  <View style={styles.avtActionWrap}>
                    <View style={styles.avtAction}>
                      <Text style={styles.avtActionText}>+</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.flow}>
                  <View style={styles.flowItem}>
                    <Text style={styles.flowItemW}>0</Text>
                    <Text>Posts</Text>
                  </View>

                  <View style={styles.flowItem}>
                    <Text style={styles.flowItemW}>999</Text>
                    <Text>Followers</Text>
                  </View>

                  <View style={styles.flowItem}>
                    <Text style={styles.flowItemW}>1</Text>
                    <Text>Following</Text>
                  </View>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <View style={flex.between}>
                  <Text style={styles.infoName}>Dzung</Text>
                  <Tag
                    icon={legit}
                    iconSize={16}
                    backGroundColor={color.successPastel}
                    textColor={color.success}
                    content="Legit"
                  />
                </View>
                <Text>@jungjung261</Text>
              </View>

              <View style={styles.userAction}>
                <TouchableOpacity
                  style={[styles.actionBtn, {backgroundColor: color.link}]}>
                  <Text style={[styles.actionText, common.text_white]}>
                    Follow
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, {backgroundColor: color.divider}]}>
                  <Text style={styles.actionText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            <ProfileSkeleton />

            <View style={styles.userContent}>
              {Array.from('12345').map((_, index) => (
                <Post commentModalRef={commentModalRef} key={index} />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeArea>

      <Modalize
        useNativeDriver
        panGestureEnabled
        modalHeight={HEIGHT_DEVICE - insets.top}
        ref={commentModalRef}
        handlePosition="inside"
        HeaderComponent={
          <View style={styles.commentHeader}>
            <Text style={styles.commentTitle}>Comments</Text>
          </View>
        }>
        <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 8}}>
          No comment yet
        </Text>
        <Text style={{textAlign: 'center', marginBottom: 8}}>
          Be the first comment
        </Text>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: '500',
  },
  userContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  userHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  avt: {
    position: 'relative',
  },
  avtActionWrap: {
    padding: 3,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -4,
    right: -4,
    borderRadius: 999,
  },
  avtAction: {
    width: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.link,
    borderRadius: 9999,
  },
  avtActionText: {
    fontSize: 18,
    fontWeight: '500',
    color: color.white,
  },
  flow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  flowItem: {
    alignItems: 'center',
    gap: 6,
  },
  flowItemW: {
    fontWeight: '500',
  },
  infoContainer: {
    marginVertical: 16,
    marginTop: 8,
  },
  infoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionBtn: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
  },
  actionText: {
    fontWeight: '500',
  },
  userContent: {
    marginTop: 16,
    gap: 32,
  },
  commentHeader: {
    paddingVertical: 32,
  },
  commentTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
