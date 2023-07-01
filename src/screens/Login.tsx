import { useState } from 'react'
import { View } from 'react-native'

import { Image } from 'expo-image'

import BrandLogo from '@assets/logo.png'
import { Button } from '@components/common'
import { LoginForm } from '@components/Form/Login'
import { useAuth } from '@hooks/useAuth'

import { At, Lock } from 'phosphor-react-native'

export const Login = () => {
  const { login, isUserLoading } = useAuth()

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
    <View className="mx-auto max-w-xs flex-1 items-center justify-center space-y-4">
      <LoginForm.TitleRoot>
        <Image source={BrandLogo} className="mx-auto h-[69px] w-[222px]" />
        <LoginForm.Title title="Login to your Account" />
        <LoginForm.Subtitle
          subtitle="Get started with our app, just create an account and enjoy the
          experience."
        />
      </LoginForm.TitleRoot>
      <LoginForm.FormRoot>
        <LoginForm.Field>
          <LoginForm.Label label="Email" />
          <LoginForm.Input
            error={emailError}
            icon={At}
            name="Email"
            value={userEmail}
            onChange={setUserEmail}
          />
        </LoginForm.Field>
        <LoginForm.Field>
          <LoginForm.Label label="Password" />
          <LoginForm.Input
            error={passwordError}
            icon={Lock}
            name="Password"
            value={userPassword}
            onChange={setUserPassword}
          />
        </LoginForm.Field>
        <Button onPress={handleLogin} isLoading={isUserLoading}>
          Login
        </Button>
      </LoginForm.FormRoot>
    </View>
  )
}
