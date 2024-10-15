// clearErrorClasses.ts
export const clearErrorClasses = (
  refs: React.RefObject<HTMLElement>[],
  className: string
) => {
  refs.forEach((ref) => {
    ref.current?.classList.remove(className);
  });
};

// validate emails
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// validate empty fields, password length and email
export const validateFields = (
  fields: {
    fieldType: string;
    value: string;
    ref: React.RefObject<HTMLElement>;
  }[],
  errorClass: string
) => {
  let hasError = false;
  fields.forEach(({ fieldType, value, ref }) => {
    if (!value.trim() && ref.current) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "This field cannot be empty *";
      hasError = true;
    } else if (
      fieldType === "password" &&
      (value.length < 8 || value.length > 60) &&
      ref.current
    ) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "Password length must be 8 - 60 characters *";
      hasError = true;
    } else if (fieldType === "email" && ref.current && !validateEmail(value)) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "Please enter a valid email *";
      hasError = true;
    } else if (
      fieldType === "name" &&
      ref.current &&
      (value.length < 2 || value.length > 50)
    ) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "Provide a valid name *";
      hasError = true;
    }
  });
  return hasError;
};

// validate new items form
export const validateNewItemAmount = (
  fields: {
    value: string | number;
    ref: React.RefObject<HTMLElement>;
  }[],
  errorClass: string
) => {
  let amountHasError = false;

  fields.forEach(({ value, ref }) => {
    let valueConverted;

    if (value === "") {
      valueConverted = "";
    } else {
      valueConverted = Number(value);
    }

    if (
      typeof valueConverted === "number" &&
      valueConverted < 0 &&
      ref.current
    ) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "Amount cannot be less than 0 *";
      amountHasError = true;
    } else if (
      typeof valueConverted === "number" &&
      valueConverted > 99999 &&
      ref.current
    ) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "Amount cannot be more than 99999 *";
      amountHasError = true;
    } else if (typeof valueConverted !== "number" && ref.current) {
      ref.current.classList.add(errorClass);
      ref.current.textContent = "Amount needs to be informed *";
      amountHasError = true;
    }
  });

  return amountHasError;
};

// validate if password and confirm password match
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
