import { useState, useContext } from "react";
import {auth} from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../Auth/AuthContext"

export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            dispatch({ type: "LOGIN", payload: user });
            setError(false);  // Reinicia el estado de error
            navigate("/articleform");
        })
        .catch((error) => {
            console.error("Error during login:", error);
            setError(true);
        });
};

  return (
    <div className="login">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)} required></input>
          <input type="password" placeholder="contraseña" onChange={e=>setPassword(e.target.value)} required></input>
          <button type="submit">Login</button>
          {error && <span>Email o contraseña incorrectos</span>}
        </form>
      </div>
    </div>
  );
};
