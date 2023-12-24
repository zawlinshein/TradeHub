import {Button, View} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {FC} from 'react';
import {registerHook} from './hooks/registerHook';
import User from './types/userType';
import {CustomTextInputProps} from './types/formTypes';
import { CustomTextInput, InputController } from '@/components/CustomeTextInput';

export const RegisterScreen = ({navigation}) => {
  const {control, onSubmitHandler, onInvalid, handleSubmit} = registerHook();

  return (
    <View style={{padding: 8}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={30} color="blue" name={'arrow-circle-left'} />
      </TouchableOpacity>
      <View>
        <InputController
          control={control}
          name={'age'}
          Component={CustomTextInput}
          keyboardType='number-pad'
        />
        <InputController
          control={control}
          name={'name'}
          Component={CustomTextInput}
          placeholder="Add name here"
        />
        <InputController
          control={control}
          name={'email'}
          Component={CustomTextInput}
          placeholder="Add email here"
        />
        <Button
          title="add"
          onPress={handleSubmit(onSubmitHandler, onInvalid)}
        />
      </View>
    </View>
  );
};
