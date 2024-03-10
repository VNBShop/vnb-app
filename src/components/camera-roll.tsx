/* eslint-disable react-native/no-inline-styles */
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
import {color} from '../UIkit/palette';

type IProps = {
  onOpenModal?: () => void;
  onSetPhotos?: (photos: string[]) => void;
};

export type CameraRollRef = {
  photos: string[];
  onOpenCammeraRoll: () => void;
};

export type ImageFromPhoneProps = {
  uri: string;
  extension: string;
};

const CameraRoll = React.forwardRef<CameraRollRef, IProps>(
  ({onOpenModal, onSetPhotos}, ref) => {
    const insets = useSafeAreaInsets();

    const [hasPermission, setHasPermission] = React.useState<boolean>(false);
    const [photos, setPhotos] = React.useState<PhotoIdentifier[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [photosSelected, setPhotosSelected] = React.useState<string[]>([]);

    const modalCameraRollRef = React.useRef<Modalize>(null);

    React.useImperativeHandle(ref, () => ({
      photos: photosSelected,
      onOpenCammeraRoll: handleAccessPhoto,
    }));

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
          res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] ===
            Permissions.RESULTS.DENIED
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
            title:
              'Please allow access to your photos and videos from settings',
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
        const permission = await Permissions.check(
          PERMISSIONS.IOS.PHOTO_LIBRARY,
        );
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

      setPhotos(res?.edges);
      setLoading(false);
    }, []);

    const handleAccessPhoto = async () => {
      await checkPermission();

      if (hasPermission) {
        !!modalCameraRollRef?.current && modalCameraRollRef.current?.open();
        await fetchPhotos();
      }
    };

    React.useEffect(() => {
      // onSetPhotos?.(photosSelected)
      () => {
        setPhotosSelected([]);
      };
    }, []);

    React.useEffect(() => {
      onSetPhotos?.(photosSelected);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photosSelected]);

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
                console.log(' >>>>', item?.node?.image);

                if (loading) {
                  return (
                    <ShimmerView
                      key={index}
                      delay={index * 100}
                      width={'33%'}
                    />
                  );
                }

                return (
                  <TouchableOpacity
                    style={[
                      styles.image,

                      {
                        borderWidth: 2,
                        borderColor: photosSelected?.includes(
                          item?.node?.image?.uri,
                        )
                          ? color.link
                          : 'rgba(255,255,255,0)',
                      },
                    ]}
                    onPress={() =>
                      setPhotosSelected(prev => {
                        if (prev?.includes(item?.node?.image?.uri)) {
                          return prev.filter(i => i !== item?.node?.image?.uri);
                        }
                        return [...prev, item?.node?.image?.uri];
                      })
                    }>
                    <Image
                      key={item?.node?.image?.uri}
                      source={{uri: item?.node?.image?.uri}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        borderRadius: 9999,
                        width: 20,
                        height: 20,
                        borderColor: 'rgba(255,255,255,.8)',
                        borderWidth: 1,
                        zIndex: 9999,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: photosSelected?.includes(
                          item?.node?.image?.uri,
                        )
                          ? color.link
                          : 'rgba(255,255,255,0)',
                      }}>
                      {!!photosSelected?.includes(item?.node?.image?.uri) && (
                        <Text
                          style={{
                            color: '#ffffff',
                            fontSize: 10,
                          }}>
                          {photosSelected?.indexOf(item?.node?.image?.uri) + 1}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              },
              style: {marginTop: 24},
            }}
            HeaderComponent={
              <View
                style={[
                  styles.headerModal,

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

                {photosSelected?.length ? (
                  <TouchableOpacity
                    onPress={() => {
                      onOpenModal?.();
                      !!modalCameraRollRef?.current &&
                        modalCameraRollRef.current?.close();
                    }}>
                    <Text style={{color: color.link, fontSize: 16}}>Done</Text>
                  </TouchableOpacity>
                ) : (
                  <Box width={38} />
                )}
              </View>
            }
          />
        </Portal>
      </>
    );
  },
);

export default CameraRoll;
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
    position: 'relative',
  },
});
