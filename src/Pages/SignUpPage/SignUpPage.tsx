import SignUpForm from "../../components/SignUpForm/SignUpForm";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";
import style from "./SignUpPage.module.css";

const SignUp = () => {
  useRedirectIfLoggedIn();

  return (
    <div className="container">
      <main className={style.mainContainer}>
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
