export interface IInventories {
    id: string;
    user_id: string;
    item: string;
    current_amount: number;
    minimum_amount: number;
}

class Inventories {
    private items: IInventories[] = [
        {
            userId: 1,
            itemName: "Milk",
            currentAmount: 7,
            minimumAmount: 3,
        },
        {
            userId: 1,
            itemName: "Dish soap",
            currentAmount: 2,
            minimumAmount: 4,
        },
        {
            userId: 2,
            itemName: "Nintendo Switch",
            currentAmount: 0,
            minimumAmount: 1,
        },
    ];

    addItem(newItem: IInventories) {
        this.items.push(newItem);
    }

    async getUserInventory(id: number): Promise<{ data: IInventories[] }> {
        const userItems = this.items.filter((item) => item.userId === id);

        return {
            data: userItems,
        };
    }

    updateItem(
        userId: number,
        itemName: string,
        updatedData: Partial<IInventories>
    ): void {
        const index = this.items.findIndex(
            (repo) => repo.userId === userId && repo.itemName === itemName
        );

        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updatedData };
        } else {
            console.log("Item not found.");
        }
    }

    deleteItem(userId: number, itemName: string): void {
        const index = this.items.findIndex(
            (repo) => repo.userId === userId && repo.itemName === itemName
        );

        if (index !== -1) {
            this.items.splice(index, 1);
        } else {
            console.log("Item not found.");
        }
    }
}

export default new Inventories();
