
import {CustomTextInputProps} from '@/screens/RegisterScreen/types/formTypes';
import {FC} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon as IconType} from 'screens/RegisterScreen/types/formTypes'

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChanageText,
  onBlur,
  keyboardType = 'default',
  placeholder,
  error,
  icon
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon && (
          <Icon
            name={icon.iconName}
            color={icon.iconColor}
            size={icon.iconSize}
          />
        )}
        <TextInput
          keyboardType={keyboardType}
          value={value.toString()}
          onChangeText={onChanageText}
          onBlur={onBlur}
          placeholderTextColor={'rgba(0,0,0,.5)'}
          style={{flex: 1}}
          placeholder={placeholder}
        />
      </View>
      {error?.message && (
        <Text style={{fontSize: 16, color: 'red'}}>{error?.message}</Text>
      )}
    </View>
  );
};

type InputType = {
  name: string
}

export const InputController: FC<{
  name: 'name' | 'age' | 'email' | 'price' | 'discount' | 'quantity' | 'type' | 'picture' | 'password';
  control: Control<any>;
  Component: React.FunctionComponent<CustomTextInputProps>;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  placeholder?: string;
  icon?: IconType;
}> = ({
  control,
  name,
  Component,
  keyboardType = 'default',
  placeholder,
  icon,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
        return (
          <Component
            value={value}
            onChanageText={
              keyboardType === 'number-pad'
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
            icon={icon}
          />
        );
      }}
    />
  );
};
