import { createContext, useEffect, useState } from "react";
import { MMKV } from "react-native-mmkv";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Children, User } from "@@types/index";
import { GOOGLE_ANDROID_CLIENT_ID } from "@env";
import { authAPI } from "@src/config/api/auth";

const storage = new MMKV({ id: "inflow" });

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

  function getUserInStorage() {
    const user = storage.getString("user");

    if (!user) return null;

    return JSON.parse(user);
  }

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
      const { data } = await authAPI.get<User>("/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      storage.set("user", JSON.stringify(data));
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function userVerification() {
    const userInStorage = getUserInStorage();
    console.log(userInStorage);

    if (!userInStorage) {
      if (
        response?.type === "success" &&
        response.authentication?.accessToken
      ) {
        setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(userInStorage);
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
