import {options} from '@/@types/phototypes';
import {addItem} from '@/api/ItemApi';
import {CustomTextInput, InputController} from '@/components/CustomeTextInput';
import {launchLibraryOrCamera} from '@/utils/photo/PhotoTaker';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Image, ImageBackground, ScrollView, Text, View,TouchableOpacity, TouchableWithoutFeedback, Button, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getPictureFromCamera} from 'utils/photo/PhotoTaker';
import z, {string} from 'zod';
import { images } from "@/assets";
import { onInvalid } from '../RegisterScreen/hooks/registerHook';

const itemSchema = z.object({
  name: z
    .string({required_error: 'name is required'})
    .min(1, 'Please enter name for the item'),
  quantity: z
    .number({required_error: ' Quantity is required'})  
    .min(1, 'Put aleast one item please'),
  price: z.number({required_error: 'Price is required'}),
  discount: z.number().min(0).max(99),
  // tags: z.array(z.number()),
  // picture: z.string(),
  // sold: z.boolean(),
});

type AddItemFromField = z.infer<typeof itemSchema>;

export const AddItemScreen = ({navigation}) => {
  const [picture, setPicture] = useState<string | undefined>('');

  const {control, handleSubmit, reset, setValue, setError} =
    useForm<AddItemFromField>({
      defaultValues: {
        name: '',
        quantity: 1,
        price: 1000,
        discount: 0,
        type: '',
        picture: '',
      },
      resolver: zodResolver(itemSchema),
    });

  const onSubmit: SubmitHandler<AddItemFromField> = async value => {
    console.log(value);
    return value;
  };

  const onImageLibraryPress = async () => {
    launchLibraryOrCamera({
      setPickerResponse: setPicture,
      options,
      path: '/items',
    });
  };

  const {mutateAsync} = useMutation({
    mutationKey: ['add-item'],
    mutationFn: addItem,
    onError(e) {
      console.log(e);
    },
    onSuccess: async data => {
      console.log(data);
    },
  });

  const requestCameraPermission = async () => {
    console.log('camera pressed so it should work');
    getPictureFromCamera(setPicture);
  };

  return (
    <>
      <View style={{padding: 8}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon size={30} color="blue" name={'arrow-circle-left'} />
        </TouchableOpacity>
      </View>
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
        ]}>
        {({pressed}) => (
          <Text style={{}}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
        )}
      </Pressable>
      
      <ScrollView
        style={{}}
        contentContainerStyle={{
          flexDirection: 'column',
          height: '100%',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => onImageLibraryPress()}
          style={{
            width: '80%',
            height: '40%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10,
            borderRadius: 60,
            overflow: 'hidden',
          }}>
          <ImageBackground
            imageStyle={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
            source={images.camera}>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{uri: picture?.toString()}}
            />
          </ImageBackground>
        </TouchableOpacity>

        <InputController
          control={control}
          name={'name'}
          Component={CustomTextInput}
          placeholder="Add name here"
          icon={{iconName: 'tag', iconColor: 'pink', iconSize: 20}}
        />
        <InputController
          control={control}
          name={'quantity'}
          Component={CustomTextInput}
          placeholder="Add name here"
          keyboardType={'number-pad'}
          icon={{iconName: 'tag', iconColor: 'pink', iconSize: 20}}
        />
        <InputController
          control={control}
          name={'price'}
          Component={CustomTextInput}
          placeholder="Add price here"
          keyboardType={'number-pad'}
          icon={{iconName: 'tag', iconColor: 'pink', iconSize: 20}}
        />
        <InputController
          control={control}
          name={'discount'}
          Component={CustomTextInput}
          placeholder="Add price here"
          keyboardType={'number-pad'}
          icon={{iconName: 'tag', iconColor: 'pink', iconSize: 20}}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            padding: 16,
            marginTop: 8,
          }}
          onPress={handleSubmit(onSubmit, onInvalid)}>
          <Text style={{color: 'white', fontSize: 16}}>RegisterItem</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};
