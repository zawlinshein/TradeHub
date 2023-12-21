import {Button, Text, TextInput, View} from 'react-native';
import {Control, Controller, FieldError} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {FC} from 'react';
import {registerHook} from './hooks/registerHook';
import User from './types/userType';
import {CustomTextInputProps} from './types/formTypes';

export const RegisterScreen = ({navigation}) => {
  const {control, onSubmitHandler, onInvalid, handleSubmit} = registerHook();

  return (
    <View style={{padding: 8}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={30} color="blue" name={'arrow-circle-left'} />
      </TouchableOpacity>
      <View>
        {/* <Controller
          control={control}
          name="name"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <View>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor={'black'}
                  style={{}}
                  placeholder="Add name here"
                />
                <Text style={{fontSize: 16, color: 'red'}}>
                  {error?.message}
                </Text>
              </View>
            );
          }}
        /> */}
        {/* <Controller
          control={control}
          name="age"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <CustomTextInput
                error={error}
                value={value}
                onChanageText={onChange}
                onBlur={onBlur}
              />
            );
          }}
        /> */}
        {/* <View>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={'black'}
            style={{}}
            placeholder="Add email here"
          />
          <Text style={{fontSize: 16, color: 'red'}}>{error?.message}</Text>
        </View> */}
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

const InputController: FC<{
  name: 'name' | 'email' | 'age';
  control: Control<User>;
  Component: React.FunctionComponent<CustomTextInputProps>;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  placeholder?: string;
}> = ({control, name, Component, keyboardType = 'default', placeholder}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
        return (
          <CustomTextInput
            value={value}
            onChanageText={
              name === 'age'
                ? e => {
                    const a = e.length ? parseInt(e, 10) : 0;
                    console.log(typeof a);
                    console.log(a);
                    return onChange(a);
                  }
                : onChange
            }
            keyboardType={keyboardType}
            onBlur={onBlur}
            error={error}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChanageText,
  onBlur,
  keyboardType = 'default',
  placeholder,
  error,
}) => {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType}
        value={value.toString()}
        onChangeText={onChanageText}
        onBlur={onBlur}
        placeholderTextColor={'black'}
        style={{}}
        placeholder={placeholder}
      />
      <Text style={{fontSize: 16, color: 'red'}}>{error?.message}</Text>
    </View>
  );
};
