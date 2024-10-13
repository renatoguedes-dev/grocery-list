import style from "./SignUpForm.module.css";
import { Link } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import mailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import { useContext, useRef, useState } from "react";
import PageContext from "../Contexts/PageContext";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import {
  clearErrorClasses,
  validateFields,
  validatePasswordsMatch,
} from "../../utils/inputFieldsVerification";
import { signUp } from "../../axios";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";

const SignUpForm = () => {
  const { setLoggedUser } = useContext(PageContext);

  // Error message refs
  const nameErrorRef = useRef<HTMLParagraphElement | null>(null);
  const emailErrorRef = useRef<HTMLParagraphElement | null>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement | null>(null);
  const confirmPasswordErrorRef = useRef<HTMLParagraphElement | null>(null);

  const { showPassword, togglePasswordVisibility, passwordInputRef } =
    usePasswordToggle();

  const {
    showPassword: showConfirmPassword,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
    passwordInputRef: confirmPasswordInputRef,
  } = usePasswordToggle();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpAPI = async () => {
    setError(null);

    try {
      const newUser = await signUp(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      if (!newUser.data.token) throw new Error("An error occurred on signup.");

      const token = newUser.data.token;
      const tokenData: any = decodeToken(token);

      Cookies.set("token", token);
      Cookies.set("tokenData", JSON.stringify(tokenData));

      setLoggedUser(tokenData);
      window.location.href = "/lists";

      return;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all previous error classes
    clearErrorClasses(
      [nameErrorRef, emailErrorRef, passwordErrorRef, confirmPasswordErrorRef],
      style.activateError
    );

    // Validate input fields
    const hasErrors = validateFields(
      [
        { fieldType: "name", value: formData.name, ref: nameErrorRef },
        {
          fieldType: "email",
          value: formData.email,
          ref: emailErrorRef,
        },
        {
          fieldType: "password",
          value: formData.password,
          ref: passwordErrorRef,
        },
        {
          fieldType: "password",
          value: formData.confirmPassword,
          ref: confirmPasswordErrorRef,
        },
      ],
      style.activateError
    );

    // return early if there are empty fields
    if (hasErrors) return null;

    // Validate if passwords match
    const passwordsDoNotMatch = validatePasswordsMatch(
      formData.password,
      formData.confirmPassword,
      [passwordErrorRef, confirmPasswordErrorRef],
      style.activateError
    );

    // If passwords do not match, return early
    if (passwordsDoNotMatch) return null;

    signUpAPI();
  };

  return (
    <div className={style.mainContainer}>
      <form className={style.signUpForm} onSubmit={handleSubmit}>
        <p className={style.accessAccountTitle}>Create your account</p>

        <div className={style.nameDiv}>
          <div className={style.inputDivs}>
            <div className={style.imageDiv}>
              <img src={userIcon} alt="user icon" className={style.icons} />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className={style.inputs}
              autoFocus
            />
          </div>

          <p className={style.errorDiv} ref={nameErrorRef}>
            This field cannot be empty *
          </p>
        </div>

        <div className={style.emailDiv}>
          <div className={style.inputDivs}>
            <div className={style.imageDiv}>
              <img src={mailIcon} alt="email icon" className={style.icons} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={style.inputs}
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
              value={formData.password}
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

        <div className={style.passwordDiv}>
          <div className={style.inputDivs}>
            <div className={style.imageDiv}>
              <img src={lockIcon} alt="lock icon" className={style.icons} />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={style.inputs}
              ref={confirmPasswordInputRef}
            />
            <div className={style.imageDiv}>
              <img
                src={showConfirmPassword ? eyeOpen : eyeHidden}
                alt="show/hide password icon"
                className={`${style.icons} ${style.showPassword}`}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          <p className={style.errorDiv} ref={confirmPasswordErrorRef}>
            This field cannot be empty *
          </p>
        </div>

        {error && <div className={style.backendErrorDiv}>{error}</div>}

        <button type="submit" className={style.signUpBtn}>
          Sign Up
        </button>

        <p className={style.forgotSignUp}>
          <span className={style.signUpSpan}>Already have an account? </span>
          <Link to="/login" className={style.signUpLink}>
            Log In here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
