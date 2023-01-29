import { useContext, useRef, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
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
    // signInWithEmailAndPassword(
    //   auth,
    //   email.current.value,
    //   password.current.value
    // )
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     dispatch({
    //       type: "LOGIN",
    //       payload: user,
    //     });
    //     user && navigate("/");
    //     // ...
    //   })
    //   .catch((error) => {
    //     setError(true);
    //     // ..
    //   });

    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider) 
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
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
