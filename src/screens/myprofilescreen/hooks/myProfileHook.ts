import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import 'react-native-get-random-values';
import {options} from '@/@types/phototypes';
import {getPictureFromCamera, launchLibraryOrCamera} from '@/utils/photo/PhotoTaker';
import { string } from 'zod';

export const myProfileHook = () => {
  const [pickerResponse, setPickerResponse] = useState<{
    
  }>();
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = async () => {
    launchLibraryOrCamera({setPickerResponse, options,});
  };

  const requestCameraPermission = async () => {
    console.log('camera pressed so it should work');
    getPictureFromCamera(setPickerResponse);
  };

  return {
    pickerResponse,
    setVisible,
    visible,
    onImageLibraryPress,
    requestCameraPermission,
  };
};

// const base64Image = response!.assets![0].base64;
// axiosInstance
//   .post('/items', {id: uu4id(), picture: base64Image})
//   .then(response => console.log(response, 'XXXXXXXXXX'))
//   .catch(error => {
//     console.log(error);
//   });

