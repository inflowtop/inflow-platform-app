import { useAuth } from "@hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      {!token ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
};
