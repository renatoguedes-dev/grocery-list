import usersDatabase from "./In-memory-repository/usersDatabase";

export const login = async (email: string, password: string) => {


    
    const userFound = usersDatabase.find(
        (user) => email === user.email && password === user.password
    );

    if (!userFound) throw new Error("E-mail and/or password is invalid!");

    return {
        data: {
            token: userFound.tokenJWT,
        },
    };
};
