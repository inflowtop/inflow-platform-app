import { TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { styled } from 'nativewind'

import { Image } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

const ImageIcon = styled(Image)

export const ImageUpload = () => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })
    console.log(result)
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
      <ImageIcon color={colors.blue['600']} size={32} />
    </TouchableOpacity>
  )
}
