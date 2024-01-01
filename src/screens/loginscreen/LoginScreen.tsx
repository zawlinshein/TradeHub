import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import z from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CustomTextInput, InputController} from '@/components/CustomeTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { onInvalid } from '../RegisterScreen/hooks/registerHook';
import {MMKV} from 'react-native-mmkv';
import { tryLogin } from '@/features/signin&out/loginSlice';
import { useDispatch } from 'react-redux';

console.log(MMKV)

const storage = new MMKV();

console.log(storage)

const loginSchema = z.object({
  email: z.string({required_error: 'email is required'}).email({message: 'Invalid Email Address'}),
  password: z.string({required_error: 'Password is required'}).min(8, 'add 8 or more characters'),
});

type loginFormField = z.infer<typeof loginSchema>;

const LoginScreen = ({navigation}) => {
  const {control, handleSubmit, reset, setValue, setError} =
    useForm<loginFormField>({
      defaultValues: {
        email: '',
        password: '',
      },
      resolver: zodResolver(loginSchema),
    });
  
  const dispatch = useDispatch();

    const onSubmitHandler: SubmitHandler<loginFormField> = async value => {
      
      const response = await dispatch(tryLogin({ email: value.email, password: value.password }))

      console.log(response)

      reset();
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '80%',
          padding: 16,
          gap: 16,
        }}>
        <InputController
          control={control}
          name={'email'}
          Component={CustomTextInput}
          placeholder="Enter email here"
        />
        <InputController
          control={control}
          name={'password'}
          Component={CustomTextInput}
          placeholder="Enter password here"
        />
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              gap: 8,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text>register</Text>
            <Icon name={'wpforms'} size={16} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              gap: 8,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSubmit(onSubmitHandler, onInvalid)}>
            <Text>sign in</Text>
            <Icon name={'sign-in'} size={16} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
