import { useCallback, useEffect, useState } from "react";
import { IInventories } from "../../In-memory-repository/Inventories";
import style from "./inventory.module.css";
import changeQuantityButtons from "../../utils/changeQuantityButtons";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import InventoryModal from "../../components/Modals/InventoryModal/InventoryModal";
import trashIcon from "../../assets/images/trashIcon.png";
import plusIcon from "../../assets/images/plusIcon.png";
import minusIcon from "../../assets/images/minusIcon.png";
import Cookies from "js-cookie";
import { removeItem, updateItem, userInventory } from "../../axios";

const InventoryPage = () => {
    useCheckLoggedUser();

    const token = Cookies.get("token");

    const [inventoryData, setInventoryData] = useState<IInventories[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const getInventoryAPI = useCallback(async () => {
        if (!token) throw new Error("No token provided");

        try {
            const result = await userInventory(token);

            const resultData = result.data.userInventory;

            setInventoryData(resultData);
        } catch (err: any) {
            console.log(err.message);
        }
    }, [token]);

    const removeItemAPI = async (itemId: string) => {
        if (!token) throw new Error("No token provided");

        try {
            await removeItem(token, itemId);

            getInventoryAPI();
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const updateItemAPI = async (
        itemId: string,
        updatedInventoryArray: IInventories[]
    ) => {
        if (!token) throw new Error("No token provided");

        const updatedItemFound = updatedInventoryArray.find(
            (updated) => updated.id === itemId
        );

        if (!updatedItemFound) throw new Error("No updated item found");

        try {
            await updateItem(
                token,
                itemId,
                updatedItemFound.currentAmount,
                updatedItemFound.minimumAmount
            );

            getInventoryAPI();
        } catch (err: any) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getInventoryAPI();
    }, [getInventoryAPI]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        currentInventory: IInventories
    ) => {
        const updatedInventory = inventoryData.map((inventory) => {
            // Check if the current inventory item matches the one being
            // updated or not
            if (inventory.id === currentInventory.id) {
                const field = e.target.name;

                // return a new object with updated field
                return { ...inventory, [field]: Number(e.target.value) };
            }

            // return the unchanged item if it doesn't match
            return inventory;
        });

        updateItemAPI(currentInventory.id, updatedInventory);
    };

    return (
        <div className="container">
            <main className={`mainContainer ${style.mainContainer}`}>
                <InventoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={getInventoryAPI}
                />
                <div className={style.headerDiv}>
                    <h2 className={style.inventoryHeader}>Inventory</h2>
                    {inventoryData.length > 0 && (
                        <button
                            className={style.newItemBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            New Item
                        </button>
                    )}
                </div>

                {inventoryData.length <= 0 && (
                    <div className={style.emptyDiv}>
                        <p className={style.emptyInventory}>
                            Your Inventory is empty.
                        </p>

                        <button
                            className={style.newItemBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            New Item
                        </button>
                    </div>
                )}

                {inventoryData.length > 0 && (
                    <table className={style.table}>
                        <thead className={style.tableHead}>
                            <tr>
                                <th>Item</th>
                                <th>Current</th>
                                <th>Minimum</th>
                                <th>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((inventory) => {
                                return (
                                    <tr key={inventory.id}>
                                        <td>{inventory.item}</td>
                                        <td>
                                            <div
                                                className={
                                                    style.quantityControl
                                                }
                                            >
                                                <button
                                                    className={`${style.buttons} ${style.minusBtn}`}
                                                    onClick={() =>
                                                        changeQuantityButtons(
                                                            updateItemAPI,
                                                            inventoryData,
                                                            inventory,
                                                            -1,
                                                            "currentAmount"
                                                        )
                                                    }
                                                    disabled={
                                                        inventory.currentAmount ===
                                                        0
                                                    }
                                                >
                                                    <img
                                                        className={`${style.minusIcon} ${style.icons}`}
                                                        src={minusIcon}
                                                        alt="Icon of minus sign"
                                                    />
                                                </button>

                                                <input
                                                    className={style.input}
                                                    type="number"
                                                    min="0"
                                                    name="currentAmount"
                                                    value={
                                                        inventory.currentAmount
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            inventory
                                                        )
                                                    }
                                                />

                                                <button
                                                    className={`${style.buttons} ${style.plusBtn}`}
                                                    onClick={() =>
                                                        changeQuantityButtons(
                                                            updateItemAPI,
                                                            inventoryData,
                                                            inventory,
                                                            1,
                                                            "currentAmount"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        className={`${style.plusIcon} ${style.icons}`}
                                                        src={plusIcon}
                                                        alt="Icon of plus sign"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    style.quantityControl
                                                }
                                            >
                                                <button
                                                    className={`${style.buttons} ${style.minusBtn}`}
                                                    onClick={() =>
                                                        changeQuantityButtons(
                                                            updateItemAPI,
                                                            inventoryData,
                                                            inventory,
                                                            -1,
                                                            "minimumAmount"
                                                        )
                                                    }
                                                    disabled={
                                                        inventory.minimumAmount ===
                                                        0
                                                    }
                                                >
                                                    <img
                                                        className={`${style.minusIcon} ${style.icons}`}
                                                        src={minusIcon}
                                                        alt="Icon of minus sign"
                                                    />
                                                </button>
                                                <input
                                                    className={style.input}
                                                    type="number"
                                                    min="0"
                                                    name="minimumAmount"
                                                    value={
                                                        inventory.minimumAmount
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            inventory
                                                        )
                                                    }
                                                />

                                                <button
                                                    className={`${style.buttons} ${style.plusBtn}`}
                                                    onClick={() =>
                                                        changeQuantityButtons(
                                                            updateItemAPI,
                                                            inventoryData,
                                                            inventory,
                                                            1,
                                                            "minimumAmount"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        className={`${style.plusIcon} ${style.icons}`}
                                                        src={plusIcon}
                                                        alt="Icon of plus sign"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            {inventory.currentAmount -
                                                inventory.minimumAmount <
                                            0
                                                ? (inventory.currentAmount -
                                                      inventory.minimumAmount) *
                                                  -1
                                                : 0}
                                        </td>
                                        <td>
                                            <img
                                                className={`${style.trashIcon} ${style.icons}`}
                                                src={trashIcon}
                                                alt="trash icon"
                                                onClick={() =>
                                                    removeItemAPI(inventory.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default InventoryPage;
