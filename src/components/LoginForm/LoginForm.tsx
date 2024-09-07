import style from "./loginForm.module.css";
import { Link } from "react-router-dom";
import mailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import { useRef, useState } from "react";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const handleShowPassword = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
        setShowPassword((previous) => !previous);
    };

    return (
        <div className={style.mainContainer}>
            <form action="" className={style.loginForm}>
                <p className={style.accessAccountTitle}>Access your account</p>
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
                <Link to="/forgot_password" className={style.signUpLink}>
                    <p className={style.forgotSignUp}>Forgot password?</p>
                </Link>
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
    );
};

export default LoginForm;
