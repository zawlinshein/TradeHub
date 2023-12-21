import {SaveUser} from '@/api/UserApi';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {useForm, SubmitHandler, SubmitErrorHandler} from 'react-hook-form';
import {mySchema, FormField} from '../types/formTypes';

export const registerHook = () => {
  const {control, handleSubmit, reset, setValue, setError} = useForm<FormField>(
    {
      defaultValues: {
        name: '',
        age: 0,
        email: '',
      },
      resolver: zodResolver(mySchema),
    },
  );

  const {mutateAsync} = useMutation({
    mutationKey: ['add-user'],
    mutationFn: SaveUser,
    onError(e) {
      console.log(e);
    },
    onSuccess: async data => {
      console.log(data);
    },
  });

  const onInvalid: SubmitErrorHandler<{
    name: string;
    age: number;
    email: string;
  }> = errors => console.error(errors);

  const onSubmitHandler: SubmitHandler<FormField> = async value => {
    const result = await mutateAsync(value);
    console.log(result);
    reset();
  };

  return {
    control,
    onSubmitHandler,
    onInvalid,
    handleSubmit,
  };
};
