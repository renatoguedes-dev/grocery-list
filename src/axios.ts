import axios from "axios";

const BASE_URL_API = "http://localhost:3000";

export const login = async (email: string, password: string) => {
    try {
        const result = await axios.post(`${BASE_URL_API}/api/login`, {
            email,
            password,
        });

        if (!result.data.token) {
            throw new Error("Invalid e-mail and/or password!");
        }

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const signUp = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    try {
        const result = await axios.post(`${BASE_URL_API}/api/signup`, {
            name,
            email,
            password,
            confirmPassword,
        });

        if (!result.data.token) {
            throw new Error("An unexpected error occurred during signup.");
        }

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const userInventory = async (token: string) => {
    try {
        const result = await axios.get(`${BASE_URL_API}/api/inventory`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
        });

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const addNewInventoryItem = async (
    token: string,
    item: string,
    currentAmount: number,
    minimumAmount: number
) => {
    try {
        const result = await axios.post(
            `${BASE_URL_API}/api/inventory`,
            {
                item,
                currentAmount,
                minimumAmount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!result) throw new Error("Error at newInventoryItem");

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const removeItem = async (token: string, itemId: string) => {
    try {
        const result = await axios.delete(`${BASE_URL_API}/api/inventory`, {
            data: { itemId },
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!result) throw new Error("Error at removeItem");

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const updateItem = async (
    token: string,
    itemId: string,
    currentAmount: number,
    minimumAmount: number
) => {
    try {
        const result = await axios.patch(
            `${BASE_URL_API}/api/inventory/${itemId}`,
            { currentAmount, minimumAmount },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!result) throw new Error("Error at updateItem");

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const addCustomList = async (
    token: string,
    listName: string,
    listDate: string
) => {
    try {
        const result = await axios.post(
            `${BASE_URL_API}/api/lists`,
            { name: listName, date: listDate },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!result) throw new Error("Error at addCustomList");

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};

export const getUserCustomLists = async (token: string) => {
    try {
        const result = await axios.get(`${BASE_URL_API}/api/lists`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!result) throw new Error("Error at getCustomLists");

        return result;
    } catch (err: any) {
        throw new Error(err.response.data.message);
    }
};
