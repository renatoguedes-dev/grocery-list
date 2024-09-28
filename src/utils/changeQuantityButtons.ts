import { IInventories } from "../In-memory-repository/Inventories";

const changeQuantityButtons = async (
    updateItemAPI: (
        itemId: string,
        updatedInventoryArray: IInventories[]
    ) => Promise<void>,
    inventoryData: IInventories[],
    inventoryItem: IInventories,
    amount: number,
    field: "minimum_amount" | "current_amount"
) => {

    const updatedInventory = inventoryData.map((inventory) => {
        if (inventory.item === inventoryItem.item) {
            console.log(inventory);
            console.log(inventoryItem);
            return {
                ...inventory,
                [field]:
                    field === "minimum_amount"
                        ? inventory.minimum_amount + amount
                        : inventory.current_amount + amount,
            };
        }

        return inventory;
    });

    console.log(updatedInventory);
    //update database only after to make sure the user doesn't get staggered
    updateItemAPI(inventoryItem.id, updatedInventory);
    console.log("here");
};

export default changeQuantityButtons;
