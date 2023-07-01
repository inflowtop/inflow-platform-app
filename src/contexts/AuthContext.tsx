import { createContext, useState } from 'react'

import { Children, UserCredentials } from '@@types/index'
import { useChatContext } from '@hooks/useChatInfo'
import { api } from '@src/config/axios'

import { AxiosError } from 'axios'

type AuthCredentials = {
  email: string
  password: string
}

type AuthDataProps = {
  user: UserCredentials
  isUserLoading: boolean
  login: (value: AuthCredentials) => Promise<void>
}

export const AuthContext = createContext({} as AuthDataProps)

export const AuthContextProvider = ({ children }: Children) => {
  const { connectUserInChat, updateUserProfile } = useChatContext()

  const [userCredentials, setUserCredentials] = useState<UserCredentials>(
    {} as UserCredentials,
  )
  const [isUserLoading, setIsUserLoading] = useState(false)

  async function login(credentials: AuthCredentials) {
    setIsUserLoading(true)
    try {
      const { data } = await api.post<UserCredentials>(
        '/api/login',
        credentials,
      )

      setUserCredentials({
        email: data.email,
        name: data.name,
        profileImage: data.profileImage,
        isProfessional: data.isProfessional,
      })

      await connectUserInChat(data.email)

      await updateUserProfile(data.name, data.profileImage)
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data)
      }
      setIsUserLoading(false)
    } finally {
      setIsUserLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isUserLoading, login, user: userCredentials }}
    >
      {children}
    </AuthContext.Provider>
  )
}
