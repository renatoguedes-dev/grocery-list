import style from "./listItemModal.module.css";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cookies from "js-cookie";
import {
  clearErrorClasses,
  validateFields,
  validateNewItemAmount,
} from "../../../utils/inputFieldsVerification";
import { addListItem } from "../../../axios";

interface ListItemModalProps {
  listId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ListItemModal = ({ listId, isOpen, onClose }: ListItemModalProps) => {
  const token = Cookies.get("token");

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const itemNameErrorRef = useRef<HTMLParagraphElement | null>(null);
  const amountErrorRef = useRef<HTMLParagraphElement | null>(null);

  const [formData, setFormData] = useState({
    itemName: "",
    amount: 0,
  });

  const closeModal = useCallback(() => {
    setFormData({
      itemName: "",
      amount: 0,
    });

    if (dialogRef.current) {
      dialogRef.current.close();
    }

    onClose();
  }, [onClose]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const newListItemAPI = async () => {
    if (!token) throw new Error("User not logged in.");

    try {
      const result = await addListItem(
        token,
        listId,
        formData.itemName,
        Number(formData.amount)
      );

      if (!result) throw new Error("Error in newListItemAPI");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear all previous error classes
    clearErrorClasses([itemNameErrorRef, amountErrorRef], style.activateError);

    // Validate input fields
    const hasErrors = validateFields(
      [{ fieldType: "item", value: formData.itemName, ref: itemNameErrorRef }],
      style.activateError
    );

    const amountHasErrors = validateNewItemAmount(
      [{ value: formData.amount, ref: amountErrorRef }],
      style.activateError
    );

    // return early if there are errors.
    if (hasErrors || amountHasErrors) return null;

    try {
      await newListItemAPI();

      closeModal();
    } catch (err: any) {
      console.error("Failed to add item: ", err.message);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;

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
        <h2 className={style.modalHeader}>Add New Item</h2>

        <form
          method="dialog"
          className={style.AddItemForm}
          onSubmit={handleSubmit}
        >
          <div className={style.listNameDiv}>
            <div className={style.inputDivs}>
              <label htmlFor="itemName">Item</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                autoFocus
              />
            </div>

            <p className={style.errorDiv} ref={itemNameErrorRef}>
              This field cannot be empty *
            </p>
          </div>

          <div className={style.dateDiv}>
            <div className={style.inputDivs}>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                min={0}
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>

            <p className={style.errorDiv} ref={amountErrorRef}>
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

export default ListItemModal;
