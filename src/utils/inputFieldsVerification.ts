// clearErrorClasses.ts
export const clearErrorClasses = (
    refs: React.RefObject<HTMLElement>[],
    className: string
) => {
    refs.forEach((ref) => {
        ref.current?.classList.remove(className);
    });
};

// validateEmptyFields.ts
export const validateFields = (
    fields: { value: string; ref: React.RefObject<HTMLElement> }[],
    errorClass: string
) => {
    let hasError = false;
    fields.forEach(({ value, ref }) => {
        if (!value.trim() && ref.current) {
            ref.current.classList.add(errorClass);
            ref.current.textContent = "This field cannot be empty *";
            hasError = true;
        } else if (value.length < 8 && ref.current) {
            console.log(value.length);
            ref.current.classList.add(errorClass);
            ref.current.textContent =
                "Password must be at least 8 characters *";
            hasError = true;
        }
    });
    return hasError;
};

// validatePasswordsMatch.ts
export const validatePasswordsMatch = (
    password: string,
    confirmPassword: string,
    refs: React.RefObject<HTMLElement>[],
    errorClass: string
) => {
    if (password !== confirmPassword) {
        refs.forEach((ref) => {
            if (ref.current) {
                ref.current.classList.add(errorClass);
                ref.current.textContent = "The passwords must match *";
            }
        });
        return true;
    }
    return false;
};
