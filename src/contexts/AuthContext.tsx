import { createContext, useEffect, useState } from "react";

import { Children, User } from "@@types/index";

import { FIREBASE_ANDROID_CLIENT } from "@env";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type AuthDataProps = {
  token: string | null;
  userInfo: User;
  isUserLoading: boolean;
  signIn: () => void;
  signOut: () => void;
};

GoogleSignin.configure({
  webClientId: FIREBASE_ANDROID_CLIENT
});

export const AuthContext = createContext({} as AuthDataProps);

export const AuthContextProvider = ({ children }: Children) => {
  const [token, setToken] = useState<string | null>("");
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [isUserLoading, setIsUserLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log("ACCESS TOKEN ==> ", idToken);

      const { user } = await auth().signInWithCredential(googleCredential);

      setToken(idToken);
      setUserInfo(user);
    } catch (error) {
      console.log(`ERROR => ${error}`);
    }
  }

  async function handleSignOut() {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setUserInfo({} as User);
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  }

  function signIn() {
    setIsUserLoading(true);
    handleSignInWithGoogle();
  }

  function signOut() {
    setIsUserLoading(true);
    handleSignOut();
    setIsUserLoading(false);
  }

  useEffect(() => {
    const listener = auth().onAuthStateChanged(user => {
      setUserInfo(user!);
    });

    return listener;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ signIn, userInfo, isUserLoading, signOut, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
