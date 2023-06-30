import { createContext, useState } from 'react'

import { Children, UserCredentials } from '@@types/index'

type AuthCredentials = {
  email: string
  password: string
}

type AuthDataProps = {
  user: UserCredentials
  isUserLoading: boolean
  login: (value: AuthCredentials) => void
}

export const AuthContext = createContext({} as AuthDataProps)

export const AuthContextProvider = ({ children }: Children) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(
    {} as UserCredentials,
  )
  const [isUserLoading, setIsUserLoading] = useState(false)

  async function login(credentials: AuthCredentials) {
    setIsUserLoading((prev) => !prev)
    try {
      // const { data } = await api.post<UserCredentials>(
      //   '/api/login',
      //   credentials,
      // )
      setUserCredentials({
        email: credentials.email,
        name: 'Patrick',
        profileImage: 'https://github.com/patricks-js.png',
      })
    } catch (err) {
      console.log(err)
      setIsUserLoading((prev) => !prev)
    } finally {
      setIsUserLoading((prev) => !prev)
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
