/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../../UIkit/layouts/safe-area';
import {color} from '../../UIkit/palette';
import {WIDTH_DEVICE, common} from '../../UIkit/styles';
import useAuth from '../../_store/useAuth';
import {photo, xmark} from '../../assets';
import CameraRoll, {CameraRollRef} from '../camera-roll';
import Avatar from '../ui/avatar';
import {Icon} from '../ui/icon';
import {
  REACT_APP_CLOUDINARY_CLOUD_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
} from '@env';
import axios from 'axios';

export default function CreatePost() {
  const refCameraRoll = React.createRef<CameraRollRef>();
  const form = useForm<{status: string}>({
    defaultValues: {
      status: '',
    },
  });

  const [modal, setModal] = React.useState(false);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const {data} = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSetPhotos = (photos: string[]) => {
    setPhotos(photos);
  };

  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const onSubmit = async ({status}: {status: string}) => {
    if (!status && !photos?.length) {
      return;
    }

    setLoading(true);

    if (photos?.length) {
      console.log('photo', photos);

      const uploadPhotosCloudinary: {
        assetId: string;
        secureUrl: string;
      }[] = [];

      // eslint-disable-next-line @typescript-eslint/no-shadow
      for (const photo of photos) {
        const formData = new FormData();
        formData.append('file', {
          uri: photo,
          type: 'image/jpeg', // Kiểu của ảnh
          name: 'photo.jpg', // Tên của ảnh
        });
        formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', REACT_APP_CLOUDINARY_CLOUD_NAME);
        formData.append('folder', 'user-threads');

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data', // Định dạng của dữ liệu
              },
            },
          );

          uploadPhotosCloudinary.push({
            assetId: response.data.asset_id,
            secureUrl: response.data.secure_url,
          });
        } catch (error) {
          console.log('err upload on cloudiany: ', error);
          setLoading(false);
        }
      }

      console.log('uploadPhotosCloudinary >>', uploadPhotosCloudinary);
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.action}>
        <Avatar
          source={
            'https://res.cloudinary.com/drpksxymr/image/upload/v1692624061/emtrangtri.jpg'
          }
          size={40}
          username="D"
        />

        <Pressable style={styles.actionMid} onPress={onOpenModal}>
          <Text style={common.text_gray}>What's on your mind?</Text>
        </Pressable>

        <CameraRoll
          ref={refCameraRoll}
          onOpenModal={onOpenModal}
          onSetPhotos={onSetPhotos}
        />
      </View>

      <Modal visible={modal} animationType="fade">
        <SafeArea>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Icon icon={xmark} size={22} onPress={onCloseModal} />
              {/* <Avatar
                source={data?.avatar ?? ''}
                username={data?.firstName ?? data?.lastName ?? ''}
                size={42}
              /> */}
            </View>

            <Text style={{fontSize: 16, fontWeight: '500'}}>Create post</Text>

            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity onPress={() => form.handleSubmit(onSubmit)()}>
                <Text style={{fontSize: 16, color: color.link}}>Done</Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
              gap: 8,
            }}>
            <Avatar
              source={data?.avatar ?? ''}
              username={data?.firstName ?? data?.lastName ?? ''}
              size={42}
            />
            <Text>{`${data?.firstName} ${data?.lastName}`}</Text>
          </View>

          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 16,
            }}>
            <Controller
              control={form.control}
              name="status"
              render={({field: {value, onChange}}) => (
                <TextInput
                  multiline
                  value={value}
                  onChangeText={onChange}
                  maxLength={200}
                  style={{
                    fontSize: 16,
                  }}
                  placeholder="What is your mind?..."
                />
              )}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 24,
            }}>
            <Icon
              size={35}
              icon={photo}
              onPress={() => {
                onCloseModal();
                !!refCameraRoll?.current &&
                  refCameraRoll?.current?.onOpenCammeraRoll();
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              marginTop: 16,
              flexWrap: 'wrap',
            }}>
            {photos?.map(p => (
              <Image
                key={p}
                source={{
                  uri: p ?? '',
                }}
                style={{
                  height: 200,
                  width: (WIDTH_DEVICE - 8) / 2,
                  marginBottom: 4,
                }}
              />
            ))}
          </View>
        </SafeArea>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
});
