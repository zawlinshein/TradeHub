import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export const launchLibraryOrCamera = ({setPickerResponse, options}) => {
    launchImageLibrary(options, response => cameraCallBackFunc(response, setPickerResponse));
    launchCamera(options, response => cameraCallBackFunc(response, setPickerResponse));
}

const cameraCallBackFunc = (response, setPickerResponse) => {
   
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
}
