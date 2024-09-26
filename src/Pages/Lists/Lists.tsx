import style from "./lists.module.css";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import CustomListModal from "../../components/Modals/CustomListModal/CustomListModal";
import { useCallback, useContext, useEffect, useState } from "react";
import PageContext from "../../components/Contexts/PageContext";
import CustomLists, {
    ICustomLists,
} from "../../In-memory-repository/CustomLists";
import Inventories, {
    IInventories,
} from "../../In-memory-repository/Inventories";

const Lists = () => {
    // check if user is logged correctly
    useCheckLoggedUser();

    const { loggedUser } = useContext(PageContext);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [userCustomLists, setUserCustomLists] = useState<ICustomLists[]>([]);
    const [inventoryData, setInventoryData] = useState<IInventories[]>([]);

    const getCustomListsAPI = useCallback(async () => {
        if (!loggedUser) return;

        const result = await CustomLists.getListByUser(loggedUser.userId);
        setUserCustomLists(result.data);
    }, [loggedUser]);

    const getInventoryAPI = useCallback(async () => {
        if (!loggedUser) return;

        const result = await Inventories.getUserInventory(loggedUser.userId);

        setInventoryData(result.data);
    }, [loggedUser]);

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
                    {(userCustomLists.length > 0 || inventoryData.length > 0) && (
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
