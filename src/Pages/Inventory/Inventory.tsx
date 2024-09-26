import { useCallback, useContext, useEffect, useState } from "react";
import Inventories, {
    IInventories,
} from "../../In-memory-repository/Inventories";
import style from "./inventory.module.css";
import changeQuantityButtons from "../../utils/changeQuantityButtons";
import PageContext from "../../components/Contexts/PageContext";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import InventoryModal from "../../components/Modals/InventoryModal/InventoryModal";
import trashIcon from "../../assets/images/trashIcon.png";
import plusIcon from "../../assets/images/plusIcon.png";
import minusIcon from "../../assets/images/minusIcon.png";

const InventoryPage = () => {
    useCheckLoggedUser();

    const { loggedUser } = useContext(PageContext);

    const [inventoryData, setInventoryData] = useState<IInventories[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isInventoryUpdated, setIsInventoryUpdated] = useState(false);

    const getInventoryAPI = useCallback(async () => {
        if (!loggedUser) return;

        const result = await Inventories.getUserInventory(loggedUser.userId);

        setInventoryData(result.data);
    }, [loggedUser]);

    useEffect(() => {
        getInventoryAPI();

        if (isInventoryUpdated === true) {
            setIsInventoryUpdated(false);
        }
    }, [isInventoryUpdated, getInventoryAPI]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        item: string
    ) => {
        const updatedInventory = inventoryData.map((inventory) => {
            // Check if the current inventory item matches the one being
            // updated or not
            if (inventory.itemName === item) {
                const field = e.target.name;

                // return a new object with updated field
                return { ...inventory, [field]: Number(e.target.value) };
            }

            // return the unchanged item if it doesn't match
            return inventory;
        });

        setInventoryData(updatedInventory);
    };

    const removeItem = (itemName: string) => {
        if (!loggedUser) {
            return;
        }

        Inventories.deleteItem(loggedUser.userId, itemName);
        getInventoryAPI();
    };

    return (
        <div className="container">
            <main className={`mainContainer ${style.mainContainer}`}>
                <InventoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onNewItem={setIsInventoryUpdated}
                />

                <button
                    className={style.newItemBtn}
                    onClick={() => setIsModalOpen(true)}
                >
                    New Item
                </button>

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
                                    <tr key={inventory.itemName}>
                                        <td>{inventory.itemName}</td>
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
                                                            inventoryData,
                                                            setInventoryData,
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
                                                        alt=""
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
                                                            inventory.itemName
                                                        )
                                                    }
                                                />

                                                <button
                                                    className={`${style.buttons} ${style.plusBtn}`}
                                                    onClick={() =>
                                                        changeQuantityButtons(
                                                            inventoryData,
                                                            setInventoryData,
                                                            inventory,
                                                            1,
                                                            "currentAmount"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        className={`${style.plusIcon} ${style.icons}`}
                                                        src={plusIcon}
                                                        alt=""
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
                                                            inventoryData,
                                                            setInventoryData,
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
                                                        alt=""
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
                                                            inventory.itemName
                                                        )
                                                    }
                                                />

                                                <button
                                                    className={`${style.buttons} ${style.plusBtn}`}
                                                    onClick={() =>
                                                        changeQuantityButtons(
                                                            inventoryData,
                                                            setInventoryData,
                                                            inventory,
                                                            1,
                                                            "minimumAmount"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        className={`${style.plusIcon} ${style.icons}`}
                                                        src={plusIcon}
                                                        alt=""
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
                                                    removeItem(
                                                        inventory.itemName
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

                {inventoryData.length <= 0 && (
                    <>
                        <p className={style.emptyInventory}>
                            Your Inventory is empty.
                        </p>
                    </>
                )}
            </main>
        </div>
    );
};

export default InventoryPage;
