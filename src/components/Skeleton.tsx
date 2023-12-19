import {FC, useEffect, useRef} from 'react';
import {Animated, ScrollView} from 'react-native';
import {generateSkeletonData} from '@/utils/Helper';

type SkeletonProps = {
  width: number | string;
  height: number;
};

export const Skeleton: FC<SkeletonProps> = ({width, height}) => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);

  const containerStyle: {} = {
    opacity: opacity.current,
    height,
    width,
    backgroundColor: 'gray',
  };

  return <Animated.View style={containerStyle} />;
};

const numberOfSkeleton = generateSkeletonData(20, {width: 100, height: 100});

export const SkeletonPlaceHolder = () => (
  <ScrollView
    horizontal={true}
    contentContainerStyle={{
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 12,
      paddingVertical: 5,
    }}>
    {numberOfSkeleton.map(skeleton => (
      <Skeleton width={skeleton.width} height={skeleton.height} />
    ))}
  </ScrollView>
);