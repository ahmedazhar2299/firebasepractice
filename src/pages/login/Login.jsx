import { useContext, useRef, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [error, setError] = useState(false);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({
          type: "LOGIN",
          payload: user,
        });
        user && navigate("/");
        // ...
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input ref={email} type="email" placeholder="email" />
        <input ref={password} type="password" placeholder="password" />
        <button type="submit">Login</button>
        {error && <span>Wrong email or Password!</span>}
      </form>
    </div>
  );
};

export default Login;
