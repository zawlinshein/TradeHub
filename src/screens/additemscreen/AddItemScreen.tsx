import {options} from '@/@types/phototypes';
import {launchLibraryOrCamera, permissions} from '@/utils/photo/PhotoTaker';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {getPictureFromCamera} from 'utils/photo/PhotoTaker';

const screenHeight = Dimensions.get('window').height

export const AddItemScreen = ({navigation}) => {
  const [picture, setPicture] = useState<string | undefined>('');

  const onImageLibraryPress = async () => {
    launchLibraryOrCamera({
      setPickerResponse: setPicture,
      options,
      path: '/users',
    });
  };

  const requestCameraPermission = async () => {
    console.log('camera pressed so it should work');
    getPictureFromCamera(setPicture);
  };

  return (
    <View style={{flex: 1, top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'black'}}>
      <View style={{flex: 1, display: 'flex', backgroundColor: 'black'}}>
        <TouchableOpacity
          style={{width: '100%', height: '100%', backgroundColor: 'white'}}
          onPress={requestCameraPermission}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
        {/* <ImageBackground style={{width: '100%' , height: 100}} src={picture}></ImageBackground> */}
      </View>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={{uri: picture!.toString()}}
      />
    </View>
  );
};
