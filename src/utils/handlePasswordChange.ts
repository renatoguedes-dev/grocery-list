import usersDatabase from "../In-memory-repository/usersDatabase";

interface IChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

function handlePasswordChange(
    loggedUserId: string,
    formData: IChangePasswordForm
): boolean {
    const foundUser = usersDatabase.find(
        (user) => user.id === loggedUserId
    );

    if (!foundUser) {
        return false;
    }

    if (foundUser.password !== formData.oldPassword) {
        return false
    }

    foundUser.password = formData.newPassword;
    return true;
}

export default handlePasswordChange;
