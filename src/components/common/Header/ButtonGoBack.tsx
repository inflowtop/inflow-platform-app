import { TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { CaretLeft } from 'phosphor-react-native'

type ButtonGoBackProps = {
  style?: string
}

export const ButtonGoBack = ({ style }: ButtonGoBackProps) => {
  const { goBack } = useNavigation()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => goBack()}
      className={style}
    >
      <CaretLeft size={24} weight="bold" />
    </TouchableOpacity>
  )
}
