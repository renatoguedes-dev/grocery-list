import { useContext, useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import lockIcon from "../../assets/images/lock.png";
import eyeOpen from "../../assets/images/eye-open.png";
import eyeHidden from "../../assets/images/eye-hidden.png";
import {
    clearErrorClasses,
    validateFields,
    validatePasswordsMatch,
} from "../../utils/inputFieldsVerification";
import PageContext from "../../components/Contexts/PageContext";
import handlePasswordChange from "../../utils/handlePasswordChange";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";

const Profile = () => {
    // check if user is logged
    useCheckLoggedUser();

    const { loggedUser } = useContext(PageContext);

    // toggle old password input/icon
    const {
        showPassword: showOldPassword,
        togglePasswordVisibility: togglePasswordVisibility,
        passwordInputRef: oldPasswordInputRef,
    } = usePasswordToggle();

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

    // state variables
    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [showResponseDiv, setShowResponseDiv] = useState(false);

    // Error message refs
    const oldPwParagraphErrorRef = useRef<HTMLParagraphElement | null>(null);
    const newPwParagraphErrorRef = useRef<HTMLParagraphElement | null>(null);
    const confNewPwParagraphErrorRef = useRef<HTMLParagraphElement | null>(
        null
    );

    // Response div ref
    const responseParagraphRef = useRef<HTMLParagraphElement | null>(null);

    // data to update form element
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loggedUser) {
            return;
        }

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
                {
                    fieldType: "password",
                    value: formData.oldPassword,
                    ref: oldPwParagraphErrorRef,
                },
                {
                    fieldType: "password",
                    value: formData.newPassword,
                    ref: newPwParagraphErrorRef,
                },
                {
                    fieldType: "password",
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

        const isPasswordUpdated = handlePasswordChange(loggedUser.id, formData);

        if (!isPasswordUpdated) {
            setShowResponseDiv(true);

            return;
        }

        setIsPasswordChanged(true);
        setShowResponseDiv(true);
        setIsChangePasswordActive(false);
    };

    useEffect(() => {
        if (
            showResponseDiv &&
            !isPasswordChanged &&
            responseParagraphRef.current
        ) {
            responseParagraphRef.current.textContent =
                "Something went wrong. Password not changed.";
        }
    }, [showResponseDiv, isPasswordChanged]);

    if (!loggedUser) return null;

    return (
        <div className="container">
            <main className={`${style.mainContainer} mainContainer`}>
                <h2>Account Data</h2>
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

                    {!isChangePasswordActive && !showResponseDiv && (
                        <button
                            className={style.firstPasswordBtn}
                            onClick={() => setIsChangePasswordActive(true)}
                        >
                            Change Password
                        </button>
                    )}

                    {isChangePasswordActive && !showResponseDiv && (
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
                                        autoFocus
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
                                            onClick={togglePasswordVisibility}
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
                                        ref={newPasswordInputRef}
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
                                            onClick={
                                                toggleNewPasswordVisibility
                                            }
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
                                            onClick={
                                                toggleConfirmNewPasswordVisibility
                                            }
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

                    {showResponseDiv && (
                        <div className={style.changePasswordForm}>
                            <p
                                className={style.paragraph}
                                ref={responseParagraphRef}
                            >
                                Password Successfully Changed.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Profile;
