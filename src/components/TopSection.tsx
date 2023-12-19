import {ImageBackground} from 'react-native';
import SearchBar from './SearchBar';
import {FC} from 'react';
import {Icon, MD2DarkTheme, MD3Colors} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

type TopSectionProps = {
  children?: React.ReactNode;
  sideBar: any;
}

const TopSection: FC<TopSectionProps> = ({children, sideBar}) => {
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#000',
      }}
      source={{uri: 'http://placekitten.com/300/300'}}>
      <TouchableOpacity
        onPress={() => sideBar.openDrawer()}
        style={{alignSelf: 'flex-start'}}>
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
