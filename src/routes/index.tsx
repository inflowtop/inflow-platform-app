import { useAuth } from "@hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { userInfo } = useAuth();

  return (
    <NavigationContainer>
      {Object.keys(userInfo).length === 0 ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
};