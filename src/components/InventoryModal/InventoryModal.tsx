import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./inventoryModal.module.css";

interface InventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InventoryModal: FC<InventoryModalProps> = ({ isOpen, onClose }) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        // Open the modal when isOpen is true
        if (isOpen && dialog) {
            dialog.showModal();
        } else if (dialog) {
            dialog.close();
        }

        // Handle Escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <dialog ref={dialogRef} className={style.modal}>
            <h1>Modal</h1>
            <form method="dialog" className={style.newItemForm}>
                <div className={style.newItemInputDiv}>
                    <label htmlFor="newItem">Item</label>
                    <input type="text" id="newItem" />
                </div>

                <div className={style.newItemInputDiv}>
                    <label htmlFor="newItem">Current Amount</label>
                    <input type="number" id="newItem" />
                </div>

                <div className={style.newItemInputDiv}>
                    <label htmlFor="newItem">Minimum Amount</label>
                    <input type="number" id="newItem" />
                </div>
                <button>Add</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </dialog>,
        document.body
    );
};

export default InventoryModal;
