import { useRef, useState } from "react";
import loggedUser from "../../In-memory-repository/loggedUser";
import style from "./profile.module.css";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
// import handlePasswordChange from "../../utils/handlePasswordChange";
import {
    clearErrorClasses,
    validateFields,
    validatePasswordsMatch,
} from "../../utils/inputFieldsVerification";

const Profile = () => {
    const [changePassword, setChangePassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    // Input refs
    const oldPasswordInputRef = useRef<HTMLInputElement | null>(null);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);

    // Error message refs
    const oldPwParagraphErrorRef = useRef<HTMLParagraphElement | null>(null);
    const newPwParagraphErrorRef = useRef<HTMLParagraphElement | null>(null);
    const confNewPwParagraphErrorRef = useRef<HTMLParagraphElement | null>(
        null
    );

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowOldPassword = () => {
        if (oldPasswordInputRef.current) {
            oldPasswordInputRef.current.type = showOldPassword
                ? "password"
                : "text";
        }
        setShowOldPassword((previous) => !previous);
    };

    const handleShowNewPassword = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showNewPassword
                ? "password"
                : "text";
        }
        setShowNewPassword((previous) => !previous);
    };

    const handleShowConfirmNewPassword = () => {
        if (confirmPasswordInputRef.current) {
            confirmPasswordInputRef.current.type = showConfirmNewPassword
                ? "password"
                : "text";
        }
        setShowConfirmNewPassword((previous) => !previous);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear all previous error classes
        clearErrorClasses(
            [
                oldPwParagraphErrorRef,
                newPwParagraphErrorRef,
                confNewPwParagraphErrorRef,
            ],
            style.activateError
        );

        // Validate input fields
        const hasErrors = validateFields(
            [
                { value: formData.oldPassword, ref: oldPwParagraphErrorRef },
                { value: formData.newPassword, ref: newPwParagraphErrorRef },
                {
                    value: formData.confirmNewPassword,
                    ref: confNewPwParagraphErrorRef,
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
            [newPwParagraphErrorRef, confNewPwParagraphErrorRef],
            style.activateError
        );

        // If passwords do not match, return early
        if (passwordsDoNotMatch) return;

        // handlePasswordChange(formData);
    };
    return (
        <main className={style.mainContainer}>
            <h2>Personal Data</h2>
            <div className={style.personalDataDiv}>
                <div>
                    <p>
                        <span className={style.span}>Nome: </span>
                        {loggedUser.name}{" "}
                    </p>
                </div>
                <div>
                    <p>
                        <span className={style.span}>E-mail: </span>
                        {loggedUser.email}{" "}
                    </p>
                </div>

                {!changePassword && (
                    <div>
                        <p>
                            <button
                                className={style.firstPasswordBtn}
                                onClick={() => setChangePassword(true)}
                            >
                                Change Password
                            </button>
                        </p>
                    </div>
                )}

                {changePassword && (
                    <form
                        className={style.changePasswordForm}
                        onSubmit={handleSubmit}
                    >
                        <div className={style.inputParent}>
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
                                    name="oldPassword"
                                    placeholder="Old Password"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    className={style.inputs}
                                    ref={oldPasswordInputRef}
                                />
                                <div className={style.imageDiv}>
                                    <img
                                        src={
                                            showOldPassword
                                                ? eyeOpen
                                                : eyeHidden
                                        }
                                        alt="show/hide password icon"
                                        className={`${style.icons} ${style.showPassword}`}
                                        onClick={handleShowOldPassword}
                                    />
                                </div>
                            </div>

                            <p
                                className={style.passwordError}
                                ref={oldPwParagraphErrorRef}
                            >
                                This field cannot be empty*
                            </p>
                        </div>

                        <div className={style.inputParent}>
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
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className={style.inputs}
                                    ref={passwordInputRef}
                                />
                                <div className={style.imageDiv}>
                                    <img
                                        src={
                                            showNewPassword
                                                ? eyeOpen
                                                : eyeHidden
                                        }
                                        alt="show/hide password icon"
                                        className={`${style.icons} ${style.showPassword}`}
                                        onClick={handleShowNewPassword}
                                    />
                                </div>
                            </div>

                            <p
                                className={style.passwordError}
                                ref={newPwParagraphErrorRef}
                            >
                                The passwords must match *
                            </p>
                        </div>

                        <div className={style.inputParent}>
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
                                    name="confirmNewPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmNewPassword}
                                    onChange={handleInputChange}
                                    className={style.inputs}
                                    ref={confirmPasswordInputRef}
                                />
                                <div className={style.imageDiv}>
                                    <img
                                        src={
                                            showConfirmNewPassword
                                                ? eyeOpen
                                                : eyeHidden
                                        }
                                        alt="show/hide password icon"
                                        className={`${style.icons} ${style.showPassword}`}
                                        onClick={handleShowConfirmNewPassword}
                                    />
                                </div>
                            </div>

                            {/* error message for new password and confirm password not matching */}
                            <p
                                className={style.passwordError}
                                ref={confNewPwParagraphErrorRef}
                            >
                                The passwords must match *
                            </p>
                        </div>

                        <button
                            type="submit"
                            className={style.changePasswordBtn}
                        >
                            Change Password
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default Profile;
