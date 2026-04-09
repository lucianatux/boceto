/*
  Componente de login que autentica al usuario con Firebase y actualiza
  el contexto de autenticación antes de redirigir a la zona de edición.
*/
import { useState, useContext } from "react";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
 
export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate();
 
  const { dispatch } = useContext(AuthContext);
 
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setError(false);
        navigate("/inicio-edit");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
 
  return (
    <div className="login">
      <div className="login-div">
        <h4>Acceso VIP a la edición</h4>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="login-loading">
                <i className="material-icons spinner-icon">autorenew</i>
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
          {error && <span>Email o contraseña incorrectos</span>}
        </form>
      </div>
    </div>
  );
};