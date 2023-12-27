import * as React from 'react';

import {
  PhotoIdentifier,
  CameraRoll as useCameraRoll,
} from '@react-native-camera-roll/camera-roll';
import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {Portal} from 'react-native-portalize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HEIGHT_DEVICE, common} from '../UIkit/styles';
import {back, photo} from '../assets';
import {ShimmerView} from './shrimmer';
import Box from './ui/box';
import {Icon} from './ui/icon';

export default function CameraRoll() {
  const insets = useSafeAreaInsets();

  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [photos, setPhotos] = React.useState<PhotoIdentifier[]>([]);
  const [loading, setLoading] = React.useState(false);

  const modalCameraRollRef = React.useRef<Modalize>(null);

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

  const fetchPhotos = React.useCallback(async () => {
    setLoading(true);
    const res = await useCameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });

    console.log('res', res);

    setPhotos(res?.edges);
    setLoading(false);
  }, []);

  const handleAccessPhoto = async () => {
    await checkPermission();

    if (hasPermission) {
      modalCameraRollRef.current?.open();
      await fetchPhotos();
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleAccessPhoto()}>
        <Icon size={35} icon={photo} />
      </TouchableOpacity>

      <Portal>
        <Modalize
          useNativeDriver
          panGestureEnabled
          modalHeight={HEIGHT_DEVICE}
          ref={modalCameraRollRef}
          avoidKeyboardLikeIOS={true}
          flatListProps={{
            data: loading ? Array(30).fill('') : photos,
            numColumns: 3,
            keyExtractor: (_, index) => index.toString(),
            renderItem: ({item, index}) => {
              if (loading) {
                return (
                  <ShimmerView key={index} delay={index * 100} width={'33%'} />
                );
              }

              return (
                <Image
                  key={item?.node?.image?.uri}
                  source={{uri: item?.node?.image?.uri}}
                  style={styles.image}
                />
              );
            },
            style: {marginTop: 24},
          }}
          HeaderComponent={
            <View
              style={[
                styles.headerModal,
                // eslint-disable-next-line react-native/no-inline-styles
                {marginTop: Platform.OS === 'ios' ? insets.top : 24},
              ]}>
              <Icon
                icon={back}
                size={25}
                onPress={() => modalCameraRollRef.current?.close()}
              />

              <Text style={(common.fontBase, common.text_base)}>
                Camera roll
              </Text>

              <Box width={25} />
            </View>
          }
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  headerModal: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginTop: 32,
  },
  image: {
    height: 150,
    width: '33%',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});
