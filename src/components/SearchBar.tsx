import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: '#f1f3f6',
        borderRadius: 8,
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Icon name="search" size={20} color="#333" />
      <TextInput
        style={{
          flex: 1,
          paddingHorizontal: 12,
          height: 44,
          backgroundColor: '#f1f3f6',
        }}
        placeholder="search..."
        autoCapitalize="words"
        autoComplete={'name'}></TextInput>
    </View>
  );
};

export default SearchBar;
