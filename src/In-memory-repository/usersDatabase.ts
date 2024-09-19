export interface ILoggedUser {
    userId: number;
    name: string;
    email: string;
    password: string;
}

const usersDatabase: ILoggedUser[] = [
    {
        userId: 1,
        name: "Renato Guedes",
        email: "renato@teste.com",
        password: "renato123456",
    },
    {
        userId: 2,
        name: "Bryan Holder",
        email: "bryan@teste.com",
        password: "bryan123456",
    },
];

export default usersDatabase;
