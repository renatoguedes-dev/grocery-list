export interface ICustomLists {
    id: number;
    userId: number;
    name: string;
    date: string;
}

class CustomLists {
    private items: ICustomLists[] = [
        {
            id: 1,
            userId: 1,
            name: "Compras Padaria",
            date: "2024-09-25",
        },
        {
            id: 2,
            userId: 1,
            name: "Compras Mix Mateus",
            date: "2024-09-26",
        },
    ];

    private id = 2;

    async getAll() {
        return {
            data: this.items,
        };
    }

    async getListByUser(userId: number): Promise<{ data: ICustomLists[] }> {
        const userLists = this.items.filter((item) => item.userId === userId);

        return {
            data: userLists,
        };
    }

    async addList(userId: number, name: string, date: string) {
        const newId = ++this.id;

        const newList = {
            id: newId,
            userId,
            name,
            date,
        };

        this.items.push(newList)
    }
}

export default new CustomLists();
