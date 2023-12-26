/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSafeArea from '../UIkit/layouts/bottom-safe-area';
import SafeArea from '../UIkit/layouts/safe-area';
import {HEIGHT_DEVICE, common, flex} from '../UIkit/styles';
import {forumP, messenger, photo, search} from '../assets';
import Avatar from '../components/ui/avatar';
import {Icon, IconOutline} from '../components/ui/icon';
import Post from '../components/ui/post';
import {Portal} from 'react-native-portalize';
import {useCameraRoll} from '@react-native-camera-roll/camera-roll';
import Permissions, {PERMISSIONS} from 'react-native-permissions';

export default function ForumScreen() {
  const insets = useSafeAreaInsets();

  const [photos, getPhotos, save] = useCameraRoll();

  const [hasPermission, setHasPermission] = React.useState<boolean>(false);

  const openSettingsAlert = React.useCallback(({title}: {title: string}) => {
    Alert.alert(title, '', [
      {
        isPreferred: true,
        style: 'default',
        text: 'Open Settings',
        onPress: () => Linking?.openSettings(),
      },
      {
        isPreferred: false,
        style: 'destructive',
        text: 'Cancel',
        onPress: () => {},
      },
    ]);
  }, []);

  const checkAndroidPermissions = React.useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.GRANTED
      ) {
        setHasPermission(true);
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] ===
          Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
          Permissions.RESULTS.BLOCKED
      ) {
        openSettingsAlert({
          title: 'Please allow access to your photos and videos from settings',
        });
      }
    } else {
      const permission = await Permissions.check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (permission === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (res === Permissions.RESULTS.GRANTED) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    }
  }, [openSettingsAlert]);

  const checkPermission = React.useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (
        permission === Permissions.RESULTS.GRANTED ||
        permission === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (
        res === Permissions.RESULTS.GRANTED ||
        res === Permissions.RESULTS.LIMITED
      ) {
        setHasPermission(true);
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        openSettingsAlert({
          title: 'Please allow access to the photo library from settings',
        });
      }
    } else if (Platform.OS === 'android') {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions, openSettingsAlert]);

  console.log('photo >>', photos);

  const handleAccessPhoto = () => {
    checkPermission();

    if (hasPermission) {
      getPhotos();
    }
  };

  const commentModalRef = React.useRef<Modalize>(null);
  return (
    <>
      <SafeArea>
        <View style={styles.header}>
          <Icon size={40} icon={forumP} />

          <View style={flex.flex_row}>
            <IconOutline size={35} icon={search} />
            <IconOutline size={35} icon={messenger} />
          </View>
        </View>

        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.container}>
          <View style={styles.action}>
            <Avatar
              source={
                'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
              }
              size={40}
              username="D"
            />

            <Pressable style={styles.actionMid}>
              <Text style={common.text_gray}>What's on your mind?</Text>
            </Pressable>

            <TouchableOpacity onPress={() => handleAccessPhoto()}>
              <Icon size={35} icon={photo} />
            </TouchableOpacity>
          </View>

          {Array.from('123455').map((_: unknown, index: number) => (
            <Post key={index.toString()} commentModalRef={commentModalRef} />
          ))}
          <BottomSafeArea />
        </ScrollView>
      </SafeArea>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          modalHeight={HEIGHT_DEVICE - insets.top}
          ref={commentModalRef}
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
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  actionMid: {
    flex: 1,
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
