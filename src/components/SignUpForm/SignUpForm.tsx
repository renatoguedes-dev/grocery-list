import style from "./SignUpForm.module.css";
import { Link } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import mailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import { useRef, useState } from "react";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);

    const handleShowPassword = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
        setShowPassword((previous) => !previous);
    };

    const handleShowConfirmPassword = () => {
        if (confirmPasswordInputRef.current) {
            confirmPasswordInputRef.current.type = showConfirmPassword ? "password" : "text";
        }
        setShowConfirmPassword((previous) => !previous);
    };

    return (
        <div className={style.mainContainer}>
            <form action="" className={style.signUpForm}>
                <p className={style.accessAccountTitle}>Create New Account</p>
                <div className={style.inputDivs}>
                    <div className={style.imageDiv}>
                        <img
                            src={userIcon}
                            alt="user icon"
                            className={style.icons}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Name"
                        className={style.inputs}
                        required
                    />
                </div>
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
                        placeholder="Email"
                        className={style.inputs}
                        required
                    />
                </div>
                <div className={style.inputDivs}>
                    <div className={style.imageDiv}>
                        <img
                            src={lockIcon}
                            alt="lock icon"
                            className={style.icons}
                        />
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        className={style.inputs}
                        ref={passwordInputRef}
                        required
                    />
                    <div className={style.imageDiv}>
                        <img
                            src={showPassword ? eyeOpen : eyeHidden}
                            alt="show/hide password icon"
                            className={`${style.icons} ${style.showPassword}`}
                            onClick={handleShowPassword}
                        />
                    </div>
                </div>
                <div className={style.inputDivs}>
                    <div className={style.imageDiv}>
                        <img
                            src={lockIcon}
                            alt="lock icon"
                            className={style.icons}
                        />
                    </div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className={style.inputs}
                        ref={confirmPasswordInputRef}
                        required
                    />
                    <div className={style.imageDiv}>
                        <img
                            src={showPassword ? eyeOpen : eyeHidden}
                            alt="show/hide password icon"
                            className={`${style.icons} ${style.showPassword}`}
                            onClick={handleShowConfirmPassword}
                        />
                    </div>
                </div>
                
                <button type="submit" className={style.loginBtn}>
                    Sign Up
                </button>

                <p className={style.forgotSignUp}>
                    <span className={style.signUpSpan}>
                        Already have an account?{" "}
                    </span>
                    <Link to="/login" className={style.signUpLink}>
                        Log In here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;
