import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import "./Login.css";

export const Login = () => {
  const { loginUser, token, authLoading } = useAuth();
  const formRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const loginHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const userCred = Object.fromEntries(formData.entries());
    console.log(userCred);
    loginUser(userCred);
  };

  return (
    <div className="login">
      <form ref={formRef} className="login-form" onSubmit={loginHandler}>
        <h1 style={{ margin: 0 }}>Signin</h1>
        <label htmlFor="username">
          Username
          <input type="text" name="username" placeholder="Username" required />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="Email" required />
        </label>

        <button disabled={authLoading} type="submit">
          {authLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
