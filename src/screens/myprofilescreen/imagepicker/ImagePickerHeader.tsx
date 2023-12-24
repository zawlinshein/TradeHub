import {SafeAreaView, View, Text} from 'react-native';
import {styles} from '../styles/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function ImagePickerHeader({navigation}) {
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 8,
          gap: 16,
        },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={30} color="blue" name={'arrow-circle-left'} />
      </TouchableOpacity>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitleText}>Avatar Picker</Text>
      </View>
    </SafeAreaView>
  );
}
