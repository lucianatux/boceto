// Contexto de autenticación que gestiona el estado del usuario y escucha cambios de sesión desde Firebase.
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";

const INITIAL_STATE = {
  currentUser: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Escucha los cambios de autenticación en Firebase y actualiza el estado global.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, []);

  /*Opcional para guardar en local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);*/

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

