import { useEffect, useRef, useState } from "react";
import style from "./accountModal.module.css";
import { createPortal } from "react-dom";

interface AccountModalProps {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const [show, setShow] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;

        // Open the modal when isOpen is true
        if (isOpen && dialog) {
            dialog.showModal();
            setTimeout(() => {
                setShow(true);
            }, 10);
        } else if (dialog) {
            dialog.close();
        }

        // Handle Escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (dialog) {
                    dialog.close();
                }
                onClose(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <dialog
            ref={dialogRef}
            className={`${style.modal} ${show ? style.open : ""}`}
        >
            Account Modal
        </dialog>,
        document.body
    );
};

export default AccountModal;
