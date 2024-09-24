import style from "./lists.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import GenerateInventoryListBtn from "../../components/GenerateInventoryListBtn/GenerateInventoryListBtn";
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
            <Sidebar />
            <main className={`mainContainer ${style.mainContainer}`}>
                <CustomListModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={getCustomListsAPI}
                />

                <div className={style.btnsDiv}>
                    <button
                        className={style.buttons}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create Custom List
                    </button>
                    <GenerateInventoryListBtn />
                </div>

                {userCustomLists.length <= 0 && inventoryData.length <= 0 && (
                    <>
                        <h2>You don't have any lists</h2>
                        <p>
                            You can create custom lists or a list based on your
                            inventory.
                        </p>
                    </>
                )}

                {(userCustomLists.length > 0 || inventoryData.length > 0) && (
                    <>
                        <h1 className={style.listsHeader}>Your lists:</h1>

                        {inventoryData.length > 0 && (
                            <div className={style.listsDiv}>Inventory List</div>
                        )}

                        {userCustomLists.length > 0 &&
                            userCustomLists.map((list) => (
                                <div key={list.id} className={style.listsDiv}>
                                    <p>{list.name}</p>
                                </div>
                            ))}
                    </>
                )}
            </main>
        </div>
    );
};

export default Lists;
