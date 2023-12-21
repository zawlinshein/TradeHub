import { SafeAreaView, View, Text } from "react-native";
import { styles } from "../styles/style";

export function ImagePickerHeader() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitleText}>Avatar Picker</Text>
      </View>
    </SafeAreaView>
  );
}
