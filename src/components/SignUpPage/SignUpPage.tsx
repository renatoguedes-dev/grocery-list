import SignUpForm from "../SignUpForm/SignUpForm";
import style from "./SignUpPage.module.css"

const SignUp = () => {
    return (
        <div className={style.root}>
            <SignUpForm />
        </div>
    );
};

export default SignUp;
