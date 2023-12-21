import {FC, useCallback, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {writeFile} from 'react-native-fs'

const options: ImageLibraryOptions | CameraOptions = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  saveToPhotos: true,
};

const permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

export const myProfileHook = () => {
  const [pickerResponse, setPickerResponse] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = () => {
    launchImageLibrary(options, response => {
      console.log('camera response', response);
      if (
        response &&
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const selectedImageUri: string | undefined = response.assets[0].uri;
        console.log('selected from storage', selectedImageUri);
        setPickerResponse(selectedImageUri);
      } else {
        console.log('User cancelled camera or uri not available');
      }
    });
  };

  const requestCameraPermission = async () => {
    console.log('camera pressed so it should work');
    try {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      if (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission given');

        // const result = await launchCamera(options, setPickerResponse)
        // setPickerResponse(result.assets[0].uri)
        launchCamera(options, response => {
          console.log('camera response', response);
          if (
            response &&
            !response.didCancel &&
            response.assets &&
            response.assets.length > 0
          ) {
            const selectedImageUri: string | undefined = response.assets[0].uri;

            setPickerResponse(selectedImageUri);
          } else {
            console.log('User cancelled camera or uri not available');
          }
        });
      } else {
        console.log(
          'write external storage',
          granted['android.permission.WRITE_EXTERNAL_STORAGE'],
        );
        console.log('camera ', granted['android.permission.CAMERA']);
        console.log(
          'read external storage',
          granted['android.permission.READ_EXTERNAL_STORAGE'],
        );
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    pickerResponse,
    setVisible,
    visible,
    onImageLibraryPress,
    requestCameraPermission,
  };
};
