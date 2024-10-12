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
    if (err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(err.message);
    }
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

export const getUserInventory = async (token: string) => {
  try {
    const result = await axios.get(`${BASE_URL_API}/api/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return result;
  } catch (err: any) {

    throw new Error(err.response.data.message);
  }
};

export const addInventoryItem = async (
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
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!result) throw new Error("Error at newInventoryItem");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const removeInventoryItem = async (token: string, itemId: string) => {
  try {
    const result = await axios.delete(`${BASE_URL_API}/api/inventory`, {
      data: { itemId },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!result) throw new Error("Error at removeInventoryItem");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const updateInventoryItem = async (
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

    if (!result) throw new Error("Error at updateInventoryItem");

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

export const getListById = async (token: string, id: string) => {
  try {
    const result = await axios.get(`${BASE_URL_API}/api/lists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!result) throw new Error("Error at getListById");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const deleteCustomList = async (token: string, id: string) => {
  try {
    const result = await axios.delete(`${BASE_URL_API}/api/lists`, {
      data: { id },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!result) throw new Error("Error at deleteCustomList");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const getListItems = async (token: string, listId: string) => {
  try {
    const result = await axios.get(
      `${BASE_URL_API}/api/lists/${listId}/list_items/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!result) throw new Error("Error at getListItems");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const addListItem = async (
  token: string,
  listId: string,
  itemName: string,
  itemAmount: number
) => {
  try {
    const result = await axios.post(
      `${BASE_URL_API}/api/lists/${listId}`,
      {
        name: itemName,
        amount: itemAmount,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!result) throw new Error("Error at addListItem");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const updateCompleteStatus = async (
  token: string,
  listId: string,
  itemId: string,
  complete: boolean
) => {
  try {
    const result = await axios.post(
      `${BASE_URL_API}/api/lists/${listId}/${itemId}`,
      {
        complete,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!result) throw new Error("Error at updateCompleteStatus");

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const deleteListItem = async (
  token: string,
  listId: string,
  itemId: string
) => {
  try {
    const result = await axios.delete(
      `${BASE_URL_API}/api/lists/${listId}/${itemId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const changePassword = async (
  token: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const result = await axios.put(
      `${BASE_URL_API}/api/profile`,
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return result;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
