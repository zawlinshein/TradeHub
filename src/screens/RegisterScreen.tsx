import {Button, Text, TextInput, View} from 'react-native';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {v4 as uuidv4} from 'uuid';
import TopSection from '@/components/TopSection';
// import {Icon} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const mySchema = z.object({
  name: z
    .string({required_error: 'Name is required'})
    .min(4, 'Name must be min 4'),
  age: z
    .number({required_error: 'Age is required'})
    .min(18, 'You must be aleast 18 years old')
    .max(100, 'R u really over 100 years old ?'),
  email: z
    .string({required_error: 'Email is required'})
    .email({message: 'Invalid Email Address'})
    .trim(),
});

type FormField = z.infer<typeof mySchema>;

export const RegisterScreen = ({navigation}) => {
  console.log(useForm());

  const {control, handleSubmit, reset} = useForm<FormField>({
    defaultValues: {
      name: '',
      email: '',
      age: 0,
    },
    resolver: zodResolver(mySchema),
  });

  const onSubmitHandler: SubmitHandler<FormField> = value => {
    const id = uuidv4();

    reset();
  };

  return (
    <View style={{padding: 8}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={30} color="blue" name={'arrow-circle-left'} />
      </TouchableOpacity>
      <View>
        <Controller
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
        />
        <Controller
          control={control}
          name="email"
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
        />
        <Controller
          control={control}
          name="age"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <View>
                <TextInput
                  keyboardType="number-pad"
                  value={value.toString()}
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
        />
        <Button title="add" onPress={handleSubmit(onSubmitHandler)} />
      </View>
    </View>
  );
};
