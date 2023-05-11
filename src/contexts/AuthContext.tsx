import { createContext } from "react";

import * as AuthSession from "expo-auth-session";

import { Children } from "@@types/Children";

type AuthDataProps = {
  signIn: () => null;
};

export const AuthContext = createContext({} as AuthDataProps);

export const AuthContextProvider = ({ children }: Children) => {
  console.log(AuthSession.makeRedirectUri());

  function signIn() {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};
