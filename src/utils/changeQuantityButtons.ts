import { Dispatch, SetStateAction } from "react";
import { IInventories } from "../In-memory-repository/Inventories";

const changeQuantityButtons = async (
    setLocalInventoryData: Dispatch<SetStateAction<IInventories[]>>,
    updateItemAPI: (
        itemId: string,
        updatedInventoryArray: IInventories[]
    ) => Promise<void>,
    inventoryData: IInventories[],
    inventoryItem: IInventories,
    amount: number,
    field: "minimumAmount" | "currentAmount"
) => {

    const updatedInventory = inventoryData.map((inventory) => {
        if (inventory.item === inventoryItem.item) {
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

    setLocalInventoryData(updatedInventory);

    //update database only after to make sure the user doesn't get staggered
    updateItemAPI(inventoryItem.id, updatedInventory);
};

export default changeQuantityButtons;
