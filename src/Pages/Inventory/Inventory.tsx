import { useContext, useEffect, useState } from "react";
import Inventories, {
    IInventories,
} from "../../In-memory-repository/Inventories";
import style from "./inventory.module.css";
import changeQuantityButtons from "../../utils/changeQuantityButtons";
import Sidebar from "../../components/Sidebar/Sidebar";
import PageContext from "../../components/Contexts/PageContext";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import InventoryModal from "../../components/InventoryModal/InventoryModal";

const InventoryPage = () => {
    useCheckLoggedUser();

    const { loggedUser } = useContext(PageContext);

    const [inventoryData, setInventoryData] = useState<IInventories[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const getInitialInventoryAPI = async () => {
        if (loggedUser) {
            const result = await Inventories.getUserInventory(
                loggedUser.userId
            );
            setInventoryData(result.data);
        }
    };

    useEffect(() => {
        getInitialInventoryAPI();
    }, []);

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

    return (
        <div className="container">
            <Sidebar />
            <main className={`mainContainer ${style.mainContainer}`}>
                <InventoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
                <button
                    className={style.newItemBtn}
                    onClick={() => setIsModalOpen(true)}
                >
                    New Item
                </button>
                <table className={style.table}>
                    <thead className={style.tableHead}>
                        <tr>
                            <th>Item</th>
                            <th>Current</th>
                            <th>Minimum</th>
                            <th>
                                Amount
                                <br /> to buy
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map((inventory) => {
                            return (
                                <tr key={inventory.itemName}>
                                    <td>{inventory.itemName}</td>
                                    <td>
                                        <div className={style.quantityControl}>
                                            <input
                                                className={style.input}
                                                type="number"
                                                min="0"
                                                name="currentAmount"
                                                value={inventory.currentAmount}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        inventory.itemName
                                                    )
                                                }
                                            />
                                            <div
                                                className={style.controlButtons}
                                            >
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
                                                    +
                                                </button>
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
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.quantityControl}>
                                            <input
                                                className={style.input}
                                                type="number"
                                                min="0"
                                                name="minimumAmount"
                                                value={inventory.minimumAmount}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        inventory.itemName
                                                    )
                                                }
                                            />
                                            <div
                                                className={style.controlButtons}
                                            >
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
                                                    +
                                                </button>
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
                                                    -
                                                </button>
                                            </div>
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default InventoryPage;
