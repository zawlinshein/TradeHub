export const generateSkeletonData = (
  count: number,
  dimensions: {width: number | string; height: number},
) => {
  return Array.from({length: count}, () => ({...dimensions}));
};
