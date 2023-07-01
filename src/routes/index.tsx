import { useAuth } from '@hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { NavigationContainer } from '@react-navigation/native'

export const Routes = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {!user.email ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  )
}
