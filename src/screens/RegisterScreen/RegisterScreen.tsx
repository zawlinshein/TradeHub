import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import React from 'react';
import {registerHook} from './hooks/registerHook';
import { CustomTextInput, InputController } from '@/components/CustomeTextInput';

export const RegisterScreen = ({navigation}) => {
  const {control, onSubmitHandler, onInvalid, handleSubmit} = registerHook();

  return (
    <View style={{padding: 8, flex: 1}}>
      <View style={{ width: '80%', marginTop: 'auto', marginBottom: 'auto', gap: 16, marginLeft: 'auto', marginRight: 'auto'}}>
        <InputController
          control={control}
          name={'age'}
          Component={CustomTextInput}
          keyboardType="number-pad"
          
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
        <InputController
          control={control}
          name={'password'}
          Component={CustomTextInput}
          placeholder="Add password here"
        />
        <TouchableOpacity style={{backgroundColor: 'pink', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, }} onPress={handleSubmit(onSubmitHandler, onInvalid)}>
          <Text style={{color: 'white', textAlign: 'center'}}>register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
