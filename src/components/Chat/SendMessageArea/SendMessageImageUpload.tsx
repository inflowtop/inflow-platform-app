import { TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { styled } from 'nativewind'

import { Image } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

const ImageIcon = styled(Image)

type SendMessageImageUploadProps = {
  handleSendImage: (assets: ImagePicker.ImagePickerAsset) => void
}

export const SendMessageImageUpload = ({
  handleSendImage,
}: SendMessageImageUploadProps) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      handleSendImage(result.assets[0])
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => handleSendImage()}>
      <ImageIcon color={colors.blue['600']} size={32} />
    </TouchableOpacity>
  )
}
