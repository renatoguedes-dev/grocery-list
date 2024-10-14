import { createPortal } from "react-dom";
import style from "./customListModal.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  clearErrorClasses,
  validateFields,
} from "../../../utils/inputFieldsVerification";
import Cookies from "js-cookie";
import { addCustomList } from "../../../axios";

interface CustomListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const CustomListModal = ({
  isOpen,
  onClose,
  onUpdate,
}: CustomListModalProps) => {
  const token = Cookies.get("token");

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const listNameErrorRef = useRef<HTMLParagraphElement | null>(null);
  const dateErrorRef = useRef<HTMLParagraphElement | null>(null);

  const [formData, setFormData] = useState({
    listName: "",
    listDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCustomListAPI = async () => {
    if (!token) throw new Error("User not logged in.");

    try {
      const listAdded = await addCustomList(
        token,
        formData.listName,
        formData.listDate
      );

      if (!listAdded) throw new Error("Error in newInventoryItemAPI");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all previous error classes
    clearErrorClasses([listNameErrorRef, dateErrorRef], style.activateError);

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

    try {
      await addCustomListAPI();

      closeModal();
      onUpdate();
    } catch (err: any) {
      console.error("Failed to add list:", err.message);
    }
  };

  const closeModal = useCallback(() => {
    setFormData({
      listName: "",
      listDate: "",
    });

    if (dialogRef.current) {
      dialogRef.current.close();
    }

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

    // Handle Clicking outside the modal for closing it
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    dialog?.addEventListener("mousedown", handleBackdropClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      dialog?.removeEventListener("mousedown", handleBackdropClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <dialog className={style.dialog} ref={dialogRef}>
      <div className={style.modal}>
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
      </div>
    </dialog>,
    document.body
  );
};

export default CustomListModal;
