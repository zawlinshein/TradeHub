import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { options } from '@/@types/phototypes';

export type cameraProp = {
  setPickerResponse: React.Dispatch<React.SetStateAction<string | undefined>>;
  options: ImageLibraryOptions | CameraOptions;
  camera?: boolean;
  path: string;
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
  path,
}: cameraProp) => {
  if (camera) {
    launchCamera(options, response =>
      cameraCallBackFunc(response, setPickerResponse, path),
    );
  } else {
    launchImageLibrary(options, response =>
      cameraCallBackFunc(response, setPickerResponse, path),
    );
  }
};

const cameraCallBackFunc = (
  response: ImagePickerResponse,
  setPickerResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
  path: string
) => {
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
};

export const getPictureFromCamera = async (
  setPickerResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
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
        path: '/items',
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

