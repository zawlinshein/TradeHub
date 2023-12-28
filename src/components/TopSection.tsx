import {Dimensions, ImageBackground} from 'react-native';
import {FC} from 'react';
import {Icon, MD3Colors} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

type TopSectionProps = {
  children?: React.ReactNode;
  sideBar: any;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const imageHeight = (SCREEN_HEIGHT / 100) * 30;

const TopSection: FC<TopSectionProps> = ({children, sideBar}) => {
  return (
    <ImageBackground
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 10,
        height: imageHeight,
      }}
      resizeMode="cover"
      source={{uri: 'http://placekitten.com/300/400'}}
      imageStyle={{
        width: '100%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <TouchableOpacity
        onPress={() => sideBar.openDrawer()}
        style={{alignSelf: 'flex-start', marginTop: 24}}>
        <Icon
          size={35}
          color={MD3Colors.neutralVariant99}
          source={'format-line-weight'}
        />
      </TouchableOpacity>
      {children}
    </ImageBackground>
  );
};

export default TopSection;
