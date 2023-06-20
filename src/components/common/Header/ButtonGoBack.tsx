import { TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { CaretLeft } from 'phosphor-react-native'

export const ButtonGoBack = () => {
  const { goBack } = useNavigation()

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => goBack()}>
      <CaretLeft size={24} weight="bold" />
    </TouchableOpacity>
  )
}
