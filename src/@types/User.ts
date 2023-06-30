import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export type User = FirebaseAuthTypes.User

export type UserCredentials = {
  name: string
  email: string
  profileImage: string
}
