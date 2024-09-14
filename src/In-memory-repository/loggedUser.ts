interface ILoggedUser {
    userId: number;
    name: string;
    email: string;
    password: string;
}

const loggedUser: ILoggedUser = {
    userId: 1,
    name: "Renato Guedes",
    email: "renato@teste.com",
    password: "hashbemgrande123456789",
};

export default loggedUser;
