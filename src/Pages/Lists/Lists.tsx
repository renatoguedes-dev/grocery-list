import style from "./lists.module.css";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import CustomListModal from "../../components/Modals/CustomListModal/CustomListModal";
import { useCallback, useEffect, useState } from "react";
import { ICustomLists } from "../../In-memory-repository/CustomLists";
import { IInventories } from "../../In-memory-repository/Inventories";
import Cookies from "js-cookie";
import { getUserCustomLists, userInventory } from "../../axios";

const Lists = () => {
    // check if user is logged correctly
    useCheckLoggedUser();

    const token = Cookies.get("token");

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [userCustomLists, setUserCustomLists] = useState<ICustomLists[]>([]);
    const [inventoryData, setInventoryData] = useState<IInventories[]>([]);

    const getCustomListsAPI = useCallback(async () => {
        if (!token) throw new Error("No token provided");

        try {
            const result = await getUserCustomLists(token);

            console.log(result.data.userCustomLists);

            setUserCustomLists(result.data.userCustomLists);
        } catch (err: any) {
            console.log(err.message);
        }
    }, [token]);

    const getInventoryAPI = useCallback(async () => {
        if (!token) throw new Error("No token provided");

        try {
            const result = await userInventory(token);

            const resultData = result.data.userInventory;

            console.log(resultData);

            setInventoryData(resultData);
        } catch (err: any) {
            console.log(err.message);
        }
    }, [token]);

    useEffect(() => {
        getCustomListsAPI();

        getInventoryAPI();
    }, [getCustomListsAPI, getInventoryAPI]);

    return (
        <div className="container">
            <main className={`mainContainer ${style.mainContainer}`}>
                <CustomListModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={getCustomListsAPI}
                />

                <div className={style.headerDiv}>
                    <h2 className={style.listsHeader}>Your lists</h2>
                    {(userCustomLists.length > 0 ||
                        inventoryData.length > 0) && (
                        <button
                            className={style.customListBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <p>New List</p>
                        </button>
                    )}
                </div>

                {userCustomLists.length <= 0 && inventoryData.length <= 0 && (
                    <>
                        <p>You don't have any lists</p>
                        <button
                            className={style.insideBtn}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <p>New List</p>
                        </button>
                    </>
                )}

                {(userCustomLists.length > 0 || inventoryData.length > 0) && (
                    <>
                        <div className={style.listsDiv}>
                            {inventoryData.length > 0 && (
                                <div className={style.list}>Inventory List</div>
                            )}

                            {userCustomLists.length > 0 &&
                                userCustomLists.map((list) => (
                                    <div key={list.id} className={style.list}>
                                        <p>{list.name}</p>
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Lists;
