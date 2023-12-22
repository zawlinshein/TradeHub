export type Item = {
  _id: string;
  price: string;
  picture: string;
  sold: boolean;
  tags: number[];
  discount: 'string';
};

export type User = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  age: number;
}