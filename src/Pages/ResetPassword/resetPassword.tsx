import style from "./resetPassword.module.css";
import mailIcon from "../../assets/images/email.png";

const ResetPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Our website does not have enough funds to send emails. You can donate to help us improve.\n\nReach the administrator for password resetting.`
    );
  };
  return (
    <div className="container">
      <main className={style.mainContainer}>
        <h2>Reset your password</h2>
        <p className={style.textParagraph}>
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <form action="" className={style.resetPasswordForm}>
          <div className={style.inputDivs}>
            <div className={style.imageDiv}>
              <img src={mailIcon} alt="email icon" className={style.icons} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className={style.inputs}
              required
            />
          </div>

          <button
            type="submit"
            className={style.continueBtn}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
