import { createContext, useEffect, useState } from 'react'

import { Children, User } from '@@types/index'
import { useChatContext } from '@hooks/useChatInfo'

import { FIREBASE_ANDROID_CLIENT } from '@env'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type AuthDataProps = {
  token: string | null
  userInfo: User
  isUserLoading: boolean
  signIn: () => void
  signOut: () => void
}

GoogleSignin.configure({
  webClientId: FIREBASE_ANDROID_CLIENT,
})

export const AuthContext = createContext({} as AuthDataProps)

export const AuthContextProvider = ({ children }: Children) => {
  const [token, setToken] = useState<string | null>('')
  const [userInfo, setUserInfo] = useState<User>({} as User)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const { connectUserInChat, updateUserProfile, disconnectUser } =
    useChatContext()

  async function handleSignInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })

      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      const { user } = await auth().signInWithCredential(googleCredential)

      setIsUserLoading(false)

      if (user && idToken) {
        setToken(idToken)
        setUserInfo(user)
        await connectUserInChat(user.uid)
        if (user.displayName && user.photoURL) {
          await updateUserProfile(user.displayName, user.photoURL)
        }
      }
    } catch (error) {
      console.log(`ERROR => ${error}`)
    }
  }

  async function handleSignOut() {
    try {
      await GoogleSignin.revokeAccess()
      await auth().signOut()
      setUserInfo({} as User)
      setToken(null)
      disconnectUser()
    } catch (error) {
      console.log(error)
    }
  }

  async function signIn() {
    setIsUserLoading(true)
    await handleSignInWithGoogle()
  }

  function signOut() {
    setIsUserLoading(true)
    handleSignOut()
    setIsUserLoading(false)
  }

  useEffect(() => {
    const listener = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user)
      }
    })

    return listener
  }, [token])

  return (
    <AuthContext.Provider
      value={{ signIn, userInfo, isUserLoading, signOut, token }}
    >
      {children}
    </AuthContext.Provider>
  )
}
