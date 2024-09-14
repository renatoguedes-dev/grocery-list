import loggedUser from "../In-memory-repository/loggedUser";

interface IChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

function handlePasswordChange(formData: IChangePasswordForm): boolean {

    if (formData.newPassword !== formData.confirmNewPassword) {
        return false
    }

    if (formData.oldPassword === loggedUser.password) {
        loggedUser.password = formData.newPassword
    }

    return true
}

export default handlePasswordChange;
