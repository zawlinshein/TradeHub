import React from 'react';
import {
  View,
} from 'react-native';
import {styles} from './styles/style';
import { myProfileHook } from './hooks/MyProfileHook';
import {ImagePickerModal} from './imagepicker/ImagePickerModal'
import { ImagePickerAvatar } from './imagepicker/ImagePickerAvator'
import { ImagePickerHeader } from './imagepicker/ImagePickerHeader';

export default function MyProfileScreen() {

  const {
    pickerResponse,
    setVisible,
    visible,
    onImageLibraryPress,
    requestCameraPermission,
  } = myProfileHook();

  console.log('the result shown here',pickerResponse)

  return (
    <View style={styles.screen}>
      <ImagePickerHeader />
      <ImagePickerAvatar
        pickerResponse={pickerResponse}
        onPress={() => setVisible(true)}
      />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={requestCameraPermission}
      />
    </View>
  );
}
