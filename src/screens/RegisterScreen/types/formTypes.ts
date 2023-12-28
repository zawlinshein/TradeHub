import z from 'zod'

export const mySchema = z.object({
  
  name: z
    .string({required_error: 'Name is required'})
    .min(4, 'Name must be min 4'),
  age: z
    .number({required_error: 'Age is required'})
    .min(18, 'Your age must be aleast 18 years old')
    .max(100, 'R u really 100 years old'),
  email: z
    .string({required_error: 'Email is required'})
    .email({message: 'Invalid Email Address'})
    .trim(),
  password: z.string().min(8, 'add 8 or more characters')
});

export type FormField = z.infer<typeof mySchema>;

export type CustomTextInputProps = {
  value: string | number;
  onChanageText: (text: string) => any;
  onBlur: () => void;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  placeholder?: string;
  error?: {message?: string};
  icon?: Icon
}

export type Icon = {
  iconName: string;
  iconColor: string;
  iconSize: number;
};