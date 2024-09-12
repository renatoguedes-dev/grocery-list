export interface IInventories {
    userId: number;
    itemName: string;
    currentAmount: number;
    minimumAmount: number;
}

class Inventories {
    private items: IInventories[] = [
        {
            userId: 1,
            itemName: "Alpiste",
            currentAmount: 7,
            minimumAmount: 3,
        },
        {
            userId: 1,
            itemName: "Sabão em pó",
            currentAmount: 22,
            minimumAmount: 4,
        },
    ];

    addItem(newItem: IInventories) {
        this.items.push(newItem);
    }

    getAllItems(): IInventories[] {
        return this.items;
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
