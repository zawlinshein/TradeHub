import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64-png';
import axiosInstance from '@/lib/Axios';
import 'react-native-get-random-values';
import {v4 as uu4id} from 'uuid';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const options: ImageLibraryOptions | CameraOptions = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
  saveToPhotos: false,
};

const permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

export const myProfileHook = () => {
  const [pickerResponse, setPickerResponse] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = async () => {
    launchImageLibrary(options, async response => {
      console.log('camera response', response);
      if (
        response &&
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const base64Image = response!.assets![0].base64;
        axiosInstance
          .post('/items', {id: uu4id(), picture: base64Image})
          .then(response => console.log(response, 'XXXXXXXXXX'))
          .catch(error => {
            console.log(error);
          });
        const selectedImageUri: string | undefined = response.assets[0].uri;
        // const resizedImage = await ImageResizer.createResizedImage(
        //   selectedImageUri,
        //   100, // Specify the desired width
        //   100, // Specify the desired height
        //   'JPEG', // Format (JPEG, PNG, etc.)
        //   1, // Image quality (0 to 1)
        //   0, // Rotation (0, 90, 180, 270)
        // );
        // console.log('selected from storage', selectedImageUri);
        //   ImgToBase64.getBase64String(selectedImageUri)
        //     .then(base64String =>
        
        //     )
        //     .catch(err => console.log(err));
        setPickerResponse(selectedImageUri);
      } else {
        console.log('User cancelled camera or uri not available');
      }
    })
  };

  const requestCameraPermission = async () => {
    console.log('camera pressed so it should work');
    try {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      if (
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
            console.log(response)
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
