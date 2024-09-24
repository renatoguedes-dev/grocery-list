export interface IUser {
    userId: string;
    name: string;
    email: string;
    password: string;
    tokenJWT: string;
}

export interface ILoggedUser {
    userId: string;
    name: string;
    email: string;
}

const JWTSecretPassword = "MySuperSecretPassword123#$?!";

const usersDatabase: IUser[] = [
    {
        userId: "1",
        name: "Renato Guedes",
        email: "renato@teste.com",
        password: "renato123",
        tokenJWT:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IlJlbmF0byBHdWVkZXMiLCJlbWFpbCI6InJlbmF0b0B0ZXN0ZS5jb20ifQ.SJePs1uwTJ_1EWp_R3D2oSneK5zYe1E_HSJ5zO6mT_8",
    },
    {
        userId: "2",
        name: "Bryan Holder",
        email: "bryan@teste.com",
        password: "bryan123",
        tokenJWT:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwibmFtZSI6IkJyeWFuIEhvbGRlciIsImVtYWlsIjoiYnJ5YW5AdGVzdGUuY29tIn0.zg0unrvH0G_hg2pmBZp3TnMBclXgbq-jyzgFL7HpomE",
    },
];

export default usersDatabase;
