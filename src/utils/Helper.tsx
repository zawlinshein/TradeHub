
export const generateSkeletonData = (
  count: number,
  dimensions: {width: number | string; height: number | string},
) => {
  return Array.from({length: count}, () => ({...dimensions}));
};

export const calculateDiscountedPrice = (discount: number, price: number) => {
  return price - Math.floor(price / discount) * 100;
};
