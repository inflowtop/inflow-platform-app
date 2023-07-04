import { TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { styled } from 'nativewind'

import { Image } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

const ImageIcon = styled(Image)

type SendMessageImageUploadProps = {
  handleSendImage: (filename: string, type: string, uri: string) => void
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
      const image = result.assets[0]

      const uriSplit = image.uri.split('.')

      const filename = image.uri.substring(
        image.uri.lastIndexOf('/') + 1,
        image.uri.length,
      )
      const fileExtension = uriSplit[uriSplit.length - 1]
      const type = `${image.type}/${fileExtension}`

      handleSendImage(filename, type, image.uri)
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
      <ImageIcon color={colors.blue['600']} size={32} />
    </TouchableOpacity>
  )
}
