import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {options} from '@/@types/phototypes';

export type cameraProp = {
  setPickerResponse: React.Dispatch<React.SetStateAction<{}>>;
  options: ImageLibraryOptions | CameraOptions;
  camera?: boolean;
};

export const permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

export const launchLibraryOrCamera = ({
  setPickerResponse,
  options,
  camera = false,
}: cameraProp) => {
  if (camera) {
    launchCamera(options, response =>
      cameraCallBackFunc(response, setPickerResponse),
    );
  } else {
    launchImageLibrary(options, response =>
      cameraCallBackFunc(response, setPickerResponse),
    );
  }
};

const cameraCallBackFunc = (
  response: ImagePickerResponse,
  setPickerResponse: React.Dispatch<React.SetStateAction<{}>>,
) => {
  console.log('camera response', response);
  if (
    response &&
    !response.didCancel &&
    response.assets &&
    response.assets.length > 0
  ) {
    const selectedImageUri: string | undefined = response.assets[0].uri;
    const base64Image = response.assets[0].base64;
    console.log('selected from storage', selectedImageUri);
    setPickerResponse({selectedImageUri, base64Image});
  } else {
    console.log('User cancelled camera or uri not available');
  }
};

export const getPictureFromCamera = async (
  setPickerResponse: React.Dispatch<React.SetStateAction<{}>>,
) => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    if (
      granted['android.permission.CAMERA'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera permission given');
      launchLibraryOrCamera({
        setPickerResponse,
        options,
        camera: true,
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
