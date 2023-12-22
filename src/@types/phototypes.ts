import { CameraOptions, ImageLibraryOptions } from "react-native-image-picker";

export const options: ImageLibraryOptions | CameraOptions = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
  saveToPhotos: false,
};
