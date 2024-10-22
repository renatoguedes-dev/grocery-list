import style from "./loginForm.module.css";
import { Link } from "react-router-dom";
import mailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import { useContext, useRef, useState } from "react";
import PageContext from "../Contexts/PageContext";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { login } from "../../axios";

import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import Spinner from "../Spinner/Spinner";

const LoginForm = () => {
  const { setLoggedUser, loading, setLoading } = useContext(PageContext);

  // Error message refs
  const emailErrorRef = useRef<HTMLParagraphElement | null>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement | null>(null);

  // custom hook to deal with variable storing and function.
  const { showPassword, togglePasswordVisibility, passwordInputRef } =
    usePasswordToggle();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginAPI = async () => {
    setError(null);
    try {
      setLoading(true);
      const userFound = await login(formData.email, formData.password);

      if (!userFound.data.token) {
        throw new Error("E-mail and/or password is invalid! (loginAPI())");
      }

      const token = userFound.data.token;
      const tokenData: any = decodeToken(token);

      Cookies.set("token", token);
      Cookies.set("tokenData", JSON.stringify(tokenData));

      setLoggedUser(tokenData);

      setLoading(false);

      window.location.href = "/lists";

      return;
    } catch (err: any) {
      setLoading(false);

      setError(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginAPI();
  };

  return (
    <>
      {loading && (
        <div className="loadingDiv">
          <Spinner loading={loading} />{" "}
        </div>
      )}

      {!loading && (
        <div className={style.mainContainer}>
          <form className={style.loginForm} onSubmit={handleSubmit}>
            <p className={style.accessAccountTitle}>Welcome back</p>

            <div className={style.emailDiv}>
              <div className={style.inputDivs}>
                <div className={style.imageDiv}>
                  <img
                    src={mailIcon}
                    alt="email icon"
                    className={style.icons}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className={style.inputs}
                  autoFocus
                />
              </div>
              <p className={style.errorDiv} ref={emailErrorRef}>
                This field cannot be empty *
              </p>
            </div>

            <div className={style.passwordDiv}>
              <div className={style.inputDivs}>
                <div className={style.imageDiv}>
                  <img src={lockIcon} alt="lock icon" className={style.icons} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  className={style.inputs}
                  ref={passwordInputRef}
                />
                <div className={style.imageDiv}>
                  <img
                    src={showPassword ? eyeOpen : eyeHidden}
                    alt="show/hide password icon"
                    className={`${style.icons} ${style.showPassword}`}
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <p className={style.errorDiv} ref={passwordErrorRef}>
                This field cannot be empty *
              </p>
            </div>

            <Link to="/reset-password" className={style.signUpLink}>
              <p className={style.forgotSignUp}>Forgot password?</p>
            </Link>

            {error && <div className={style.backendErrorDiv}>{error}</div>}

            <button type="submit" className={style.loginBtn}>
              Log in
            </button>

            <p className={style.forgotSignUp}>
              <span className={style.signUpSpan}>
                Don&apos;t have an account?{" "}
              </span>
              <Link to="/signup" className={style.signUpLink}>
                Sign Up here
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
