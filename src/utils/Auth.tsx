import { createContext, useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase";

export const AuthContext = createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({
    loading: true,
  });

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser
        ? { loggedIn: true, uid: firebaseUser.uid }
        : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);

  return authInit;
}
