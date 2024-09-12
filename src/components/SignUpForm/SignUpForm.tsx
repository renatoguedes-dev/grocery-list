import style from "./SignUpForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userIcon from "../../assets/images/user.png";
import mailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import { useContext, useRef, useState } from "react";
import PageContext from "../Contexts/PageContext";

const SignUpForm = () => {
    const { setCreatedUserEmail } = useContext(PageContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }
        setShowPassword((previous) => !previous);
    };

    const handleShowConfirmPassword = () => {
        if (confirmPasswordInputRef.current) {
            confirmPasswordInputRef.current.type = showConfirmPassword
                ? "password"
                : "text";
        }
        setShowConfirmPassword((previous) => !previous);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/signup",
                formData
            );

            console.log(response);

            setCreatedUserEmail(response.data.createdUser.email)

            console.log("User registered successfully!");
            navigate("/welcome");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { data } = error.response || {};
                console.log("Error Message:", data.message);

                if (data.errors) {
                    data.errors.forEach(
                        (error: { field: string; message: string }) => {
                            console.log(`${error.field}: ${error.message}`);
                        }
                    );
                }
            } else {
                console.error(
                    "An unexpected error occurred during signup: ",
                    (error as Error).message
                );
            }
        }
    };

    return (
        <div className={style.mainContainer}>
            <form className={style.signUpForm} onSubmit={handleSubmit}>
                <p className={style.accessAccountTitle}>Create your account</p>
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
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleInputChange}
                        className={style.inputs}
                        ref={passwordInputRef}
                        minLength={8}
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
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={style.inputs}
                        ref={confirmPasswordInputRef}
                        minLength={8}
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

                <button type="submit" className={style.signUpBtn}>
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
