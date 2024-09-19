import { useRef, useState } from "react";

const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const togglePasswordVisibility = () => {
        if (passwordInputRef.current) {
            passwordInputRef.current.type = showPassword ? "password" : "text";
        }

        setShowPassword((previous) => !previous);
    };

    return { showPassword, togglePasswordVisibility, passwordInputRef };
};

export default usePasswordToggle;
