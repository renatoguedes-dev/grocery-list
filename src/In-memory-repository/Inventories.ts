export interface IInventories {
    id: string;
    userId: string;
    item: string;
    currentAmount: number;
    minimumAmount: number;
}

class Inventories {
    private items: IInventories[] = [
        {
            id: "23453",
            userId: "1",
            item: "Milk",
            currentAmount: 7,
            minimumAmount: 3,
        },
        {
            id: "23353",
            userId: "1",
            item: "Dish soap",
            currentAmount: 2,
            minimumAmount: 4,
        },
        {
            id: "23323",
            userId: "2",
            item: "Nintendo Switch",
            currentAmount: 0,
            minimumAmount: 1,
        },
    ];

    addItem(newItem: IInventories) {
        this.items.push(newItem);
    }

    async getUserInventory(id: string): Promise<{ data: IInventories[] }> {
        const userItems = this.items.filter((item) => item.userId === id);

        return {
            data: userItems,
        };
    }

    updateItem(
        userId: string,
        itemName: string,
        updatedData: Partial<IInventories>
    ): void {
        const index = this.items.findIndex(
            (repo) => repo.userId === userId && repo.item === itemName
        );

        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updatedData };
        } else {
            console.log("Item not found.");
        }
    }

    deleteItem(userId: string, itemName: string): void {
        const index = this.items.findIndex(
            (repo) => repo.userId === userId && repo.item === itemName
        );

        if (index !== -1) {
            this.items.splice(index, 1);
        } else {
            console.log("Item not found.");
        }
    }
}

export default new Inventories();
