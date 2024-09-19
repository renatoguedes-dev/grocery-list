import style from "./loginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import mailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import { useContext, useRef, useState } from "react";
import usersDatabase from "../../In-memory-repository/usersDatabase";
import PageContext from "../Contexts/PageContext";

const LoginForm = () => {
    const navigate = useNavigate();
    const { loggedUser, setLoggedUser } = useContext(PageContext);

    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleShowPassword = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
        setShowPassword((previous) => !previous);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userFound = usersDatabase.find(
            (user) =>
                formData.email === user.email &&
                formData.password === user.password
        );

        if (!userFound) {
            return alert("Incorrect e-mail or password.");
        }

        setLoggedUser(userFound);
        navigate("/dashboard");
    };

    return (
        <div className={style.mainContainer}>
            <form className={style.loginForm} onSubmit={handleSubmit}>
                <p className={style.accessAccountTitle}>Welcome back</p>
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
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
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
                <Link to="/reset-password" className={style.signUpLink}>
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
