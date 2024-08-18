import { useState } from "react";
import {auth} from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className="login">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}></input>
          <input type="password" placeholder="contraseña" onChange={e=>setPassword(e.target.value)}></input>
          <button type="submit">Login</button>
          {error && <span>Email o contraseña incorrectos</span>}
        </form>
      </div>
    </div>
  );
};
