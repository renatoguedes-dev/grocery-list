import { IInventories } from "../In-memory-repository/Inventories";

const changeQuantityButtons = (
    inventoryData: IInventories[],
    setInventoryData: React.Dispatch<React.SetStateAction<IInventories[]>>,
    inventoryItem: IInventories,
    amount: number,
    field: "minimumAmount" | "currentAmount"
) => {
    const updatedInventory = inventoryData.map((inventory) => {
        if (inventory.itemName === inventoryItem.itemName) {
            return {
                ...inventory,
                [field]:
                    field === "minimumAmount"
                        ? inventory.minimumAmount + amount
                        : inventory.currentAmount + amount,
            };
        }

        return inventory;
    });

    setInventoryData(updatedInventory);
};

export default changeQuantityButtons;
