import { createContext, useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Children } from "@@types/Children";
import { User } from "@@types/User";
import { GOOGLE_ANDROID_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();

type AuthDataProps = {
  userInfo: User;
  isUserLoading: boolean;
  signIn: () => void;
};

export const AuthContext = createContext({} as AuthDataProps);

export const AuthContextProvider = ({ children }: Children) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({} as User);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_ANDROID_CLIENT_ID
  });

  async function handleSignInWithGoogle() {
    try {
      setIsUserLoading(prev => !prev);
      await promptAsync();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(prev => !prev);
    }
  }

  function signIn() {
    handleSignInWithGoogle();
  }

  async function getUserInfo(token: string) {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function userVerification() {
    if (response?.type === "success" && response.authentication?.accessToken) {
      setToken(response.authentication.accessToken);
      getUserInfo(response.authentication.accessToken);
    }
  }

  useEffect(() => {
    userVerification();
  }, [response, token]);

  return (
    <AuthContext.Provider value={{ signIn, userInfo, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
