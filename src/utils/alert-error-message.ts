import { Alert } from 'react-native'

export function alertError(message: string) {
  Alert.alert('Error', message, [
    {
      text: 'Ok',
    },
  ])
}
