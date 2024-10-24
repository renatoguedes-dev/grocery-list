import Cookies from "js-cookie";
import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { checkResetToken, resetPassword } from "../../axios";
import style from "./resetPassword.module.css";
import PageContext from "../../components/Contexts/PageContext";
import Spinner from "../../components/Spinner/Spinner";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import {
  clearErrorClasses,
  validateFields,
  validatePasswordsMatch,
} from "../../utils/inputFieldsVerification";
import { decodeToken } from "react-jwt";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(true);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const newPasswordErrorRef = useRef<HTMLParagraphElement | null>(null);
  const confirmNewPasswordErrorRef = useRef<HTMLParagraphElement | null>(null);

  const { setLoggedUser, loading, setLoading } = useContext(PageContext);

  const token = searchParams.get("token");

  // toggle new password input/icon
  const {
    showPassword: showNewPassword,
    togglePasswordVisibility: toggleNewPasswordVisibility,
    passwordInputRef: newPasswordInputRef,
  } = usePasswordToggle();

  // toggle confirm new password input/icon
  const {
    showPassword: showConfirmNewPassword,
    togglePasswordVisibility: toggleConfirmNewPasswordVisibility,
    passwordInputRef: confirmPasswordInputRef,
  } = usePasswordToggle();

  const resetPasswordAPI = async () => {
    try {
      setLoading(true);
      const passwordReset = await resetPassword(
        formData.newPassword,
        formData.confirmNewPassword,
        token!
      );

      if (!passwordReset.data.token)
        throw new Error("Password could not be reset.");

      console.log({ passwordReset });

      const newToken = passwordReset.data.token;
      const tokenData: any = decodeToken(newToken);

      console.log({ newToken });
      console.log({ tokenData });

      Cookies.set("token", newToken, {
        sameSite: "None",
        secure: true,
      });

      Cookies.set("tokenData", JSON.stringify(tokenData), {
        sameSite: "None",
        secure: true,
      });

      setLoggedUser(tokenData);

      setLoading(false);

      window.location.href = "/lists";

      return;
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all previous error classes
    clearErrorClasses(
      [newPasswordErrorRef, confirmNewPasswordErrorRef],
      style.activateError
    );

    // Validate input fields
    const hasErrors = validateFields(
      [
        {
          fieldType: "password",
          value: formData.newPassword,
          ref: newPasswordErrorRef,
        },
        {
          fieldType: "password",
          value: formData.confirmNewPassword,
          ref: confirmNewPasswordErrorRef,
        },
      ],
      style.activateError
    );

    // If there are empty fields
    if (hasErrors) return;

    // Validate if new passwords match
    const passwordsDoNotMatch = validatePasswordsMatch(
      formData.newPassword,
      formData.confirmNewPassword,
      [newPasswordErrorRef, confirmNewPasswordErrorRef],
      style.activateError
    );

    // If passwords do not match, return early
    if (passwordsDoNotMatch) return;

    resetPasswordAPI();
  };

  useEffect(() => {
    const checkResetTokenAPI = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        setLoading(true);
        const validationResult = await checkResetToken(token);
        setLoading(false);

        if (!validationResult) {
          setIsValidToken(false);
          return;
        }
      } catch (err: any) {
        console.log(err.message);
        setIsValidToken(false);
        setLoading(false);
      }
    };

    checkResetTokenAPI();
  }, [token, setLoading]);

  if (!isValidToken) return <NotFoundPage />;

  return (
    <div className="container">
      {loading && (
        <div className="loadingDiv" style={{ marginTop: "20vh" }}>
          <Spinner loading={loading} />
        </div>
      )}

      {!loading && (
        <main className={style.mainContainer}>
          <h1 className={style.header}>Reset Password</h1>

          <form className={style.resetPasswordForm} onSubmit={handleSubmit}>
            <div className={style.passwordDiv}>
              <div className={style.inputDivs}>
                <div className={style.imageDiv}>
                  <img src={lockIcon} alt="lock icon" className={style.icons} />
                </div>

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={style.inputs}
                  ref={newPasswordInputRef}
                />

                <div className={style.imageDiv}>
                  <img
                    src={showNewPassword ? eyeOpen : eyeHidden}
                    alt="show/hide password icon"
                    className={`${style.icons} ${style.showPassword}`}
                    onClick={toggleNewPasswordVisibility}
                  />
                </div>
              </div>

              <p className={style.passwordError} ref={newPasswordErrorRef}>
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
                  name="confirmNewPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className={style.inputs}
                  ref={confirmPasswordInputRef}
                />

                <div className={style.imageDiv}>
                  <img
                    src={showConfirmNewPassword ? eyeOpen : eyeHidden}
                    alt="show/hide password icon"
                    className={`${style.icons} ${style.showPassword}`}
                    onClick={toggleConfirmNewPasswordVisibility}
                  />
                </div>
              </div>

              <p
                className={style.passwordError}
                ref={confirmNewPasswordErrorRef}
              >
                This field cannot be empty *
              </p>
            </div>

            <button type="submit" className={style.changePasswordBtn}>
              Reset Password
            </button>
          </form>
        </main>
      )}
    </div>
  );
};

export default ResetPassword;
