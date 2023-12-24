export type Item = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  type: string;
  discount?: number;
  tags: number[];
  picture?: string;
  sold?: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  age: number;
}