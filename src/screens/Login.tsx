import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

import { Image } from 'expo-image'

import BrandLogo from '@assets/logo.png'
import { Button } from '@components/common'
import { useAuth } from '@hooks/useAuth'

export const Login = () => {
  const { login } = useAuth()

  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [emailError, setEmailError] = useState({
    isError: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: '',
  })

  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
  }

  function handleLogin() {
    if (!validateEmail(userEmail)) {
      setEmailError({ isError: true, message: 'Invalid email' })
      return
    } else {
      setEmailError({
        isError: false,
        message: '',
      })
    }

    if (userPassword.length === 0) {
      setPasswordError({ isError: true, message: 'Invalid password' })
      return
    } else {
      setPasswordError({
        isError: false,
        message: '',
      })
    }

    login({
      email: userEmail,
      password: userPassword,
    })

    setUserEmail('')
    setUserPassword('')
  }

  return (
    <View className="flex-1 items-center justify-center space-y-4">
      <Image source={BrandLogo} className="mb-6 h-16 w-56" />
      <View className="w-full max-w-xs space-y-2">
        <TextInput
          className="rounded border border-gray-500 px-4 py-2 focus:border-blue-600"
          placeholder="Email"
          value={userEmail}
          id="email"
          onChangeText={(text: string) => setUserEmail(text)}
        />
        {emailError.isError ? (
          <Text className="text-red-600">{emailError.message}</Text>
        ) : null}
        <TextInput
          className="rounded border border-gray-500 px-4 py-2 focus:border-blue-600"
          placeholder="Password"
          value={userPassword}
          id="password"
          onChangeText={(text: string) => setUserPassword(text)}
          secureTextEntry
        />
        {passwordError.isError ? (
          <Text className="text-red-600">{passwordError.message}</Text>
        ) : null}
        <Button onPress={handleLogin}>Login</Button>
      </View>
      <Text className="text-center text-sm text-gray-500">
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta.
      </Text>
    </View>
  )
}
