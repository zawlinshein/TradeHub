import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/style";
import { images } from "@/assets";
import avator from 'assets/images/avatar.jpg'

console.log('type of image from assets',typeof images.avatar)
console.log(images)
console.log(avator)

export function ImagePickerAvatar({
  pickerResponse,
  onPress,
}: Readonly<{
  pickerResponse: any;
  onPress: any;
}>): React.JSX.Element {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={images.whatsappBackground}>
      <View style={styles.avatar}>
        <Image
          style={styles.avatarImage}
          source={
            pickerResponse.selectedImageUri
              ? {uri: pickerResponse.selectedImageUri.toString()}
              : images.avatar
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
          <Image style={styles.addButtonIcon} source={images.addButton} />
        </TouchableOpacity>
        <Text style={styles.usernameText}>Gapur Kassym</Text>
      </View>
    </ImageBackground>
  );
}
