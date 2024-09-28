import { createPortal } from "react-dom";
import style from "./customListModal.module.css";
import {
    FC,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import PageContext from "../../Contexts/PageContext";
import {
    clearErrorClasses,
    validateFields,
} from "../../../utils/inputFieldsVerification";
import CustomLists from "../../../In-memory-repository/CustomLists";

interface CustomListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

const CustomListModal: FC<CustomListModalProps> = ({
    isOpen,
    onClose,
    onUpdate,
}) => {
    const { loggedUser } = useContext(PageContext);

    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const listNameErrorRef = useRef<HTMLParagraphElement | null>(null);
    const dateErrorRef = useRef<HTMLParagraphElement | null>(null);

    const [formData, setFormData] = useState({
        listName: "",
        listDate: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(typeof formData.listDate);
        console.log(formData.listDate);
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Clear all previous error classes
        clearErrorClasses(
            [listNameErrorRef, dateErrorRef],
            style.activateError
        );

        // Validate input fields
        const hasErrors = validateFields(
            [
                {
                    fieldType: "name",
                    value: formData.listName,
                    ref: listNameErrorRef,
                },
                {
                    fieldType: "date",
                    value: formData.listDate,
                    ref: dateErrorRef,
                },
            ],
            style.activateError
        );

        // return early if there are errors.
        if (hasErrors) return null;

        if (!loggedUser) return null;

        CustomLists.addList(
            loggedUser?.id,
            formData.listName,
            formData.listDate
        );

        const dialog = dialogRef.current;

        if (dialog) {
            dialog.close();
            closeModal();
            onUpdate();
        }
    };

    const closeModal = useCallback(() => {
        setFormData({
            listName: "",
            listDate: "",
        });

        onClose();
    }, [onClose]);

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
                closeModal();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose, closeModal]);

    if (!isOpen) return null;

    return createPortal(
        <dialog ref={dialogRef} className={style.modal}>
            <h1 className={style.modalHeader}>Create a Custom List</h1>
            <form
                method="dialog"
                className={style.customListForm}
                onSubmit={handleSubmit}
            >
                <div className={style.listNameDiv}>
                    <div className={style.inputDivs}>
                        <label htmlFor="listName">List Name</label>
                        <input
                            type="text"
                            id="listName"
                            name="listName"
                            value={formData.listName}
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </div>

                    <p className={style.errorDiv} ref={listNameErrorRef}>
                        This field cannot be empty *
                    </p>
                </div>

                <div className={style.dateDiv}>
                    <div className={style.inputDivs}>
                        <label htmlFor="listDate">Date</label>
                        <input
                            type="date"
                            id="listDate"
                            name="listDate"
                            value={formData.listDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <p className={style.errorDiv} ref={dateErrorRef}>
                        This field cannot be empty *
                    </p>
                </div>

                <div className={style.buttonsDiv}>
                    <button type="submit">Add Item</button>
                    <button className={style.cancelBtn} onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </dialog>,
        document.body
    );
};

export default CustomListModal;
