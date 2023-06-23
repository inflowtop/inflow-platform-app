import { useAuth } from '@hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

import { NavigationContainer } from '@react-navigation/native'

export const Routes = () => {
  const { token } = useAuth()

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
