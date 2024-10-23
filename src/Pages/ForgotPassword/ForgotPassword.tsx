import style from "./forgotPassword.module.css";
import mailIcon from "../../assets/images/email.png";
import { useRef, useState } from "react";
import { sendResetEmail } from "../../axios";
import {
  clearErrorClasses,
  validateFields,
} from "../../utils/inputFieldsVerification";

const ForgotPassword = () => {
  // Error message ref
  const emailErrorRef = useRef<HTMLParagraphElement | null>(null);

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    clearErrorClasses([emailErrorRef], style.activateError);

    const hasErrors = validateFields(
      [
        {
          fieldType: "email",
          value: formData.email,
          ref: emailErrorRef,
        },
      ],
      style.activateError
    );

    if (hasErrors) return null;

    setIsEmailSent(true);

    try {
      await sendResetEmail(formData.email);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <main className={style.mainContainer}>
        {!isEmailSent && (
          <>
            <h2>Reset your password</h2>
            <p className={style.textParagraph}>
              Enter your email address and we will send you instructions to
              reset your password.
            </p>

            <form action="" className={style.resetPasswordForm}>
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
                  />
                </div>

                <p className={style.errorDiv} ref={emailErrorRef}>
                  This field cannot be empty *
                </p>
              </div>

              <button
                type="submit"
                className={style.continueBtn}
                onClick={handleSubmit}
              >
                Continue
              </button>
            </form>
          </>
        )}

        {isEmailSent && (
          <div className={style.emailSentDiv}>
            <h2>E-mail sent!</h2>
            <p className={style.textParagraph}>
              If the e-mail provided exists, you will receive a link to redefine
              your password.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ForgotPassword;
