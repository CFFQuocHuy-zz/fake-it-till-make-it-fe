import {useContext, createContext, useEffect, useState, ReactNode} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {auth} from "../config/firebase";

interface IAuthContext {
  googleSignIn: () => void;
  logOut: () => void;
  user: {};
}
const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider)
  };

  const logOut = () => {
    signOut(auth);
  };
  return (
    <AuthContext.Provider value={{googleSignIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
