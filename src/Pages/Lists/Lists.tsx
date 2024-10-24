import style from "./lists.module.css";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";
import CustomListModal from "../../components/Modals/CustomListModal/CustomListModal";
import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICustomLists } from "../../In-memory-repository/CustomLists";
import { IInventories } from "../../In-memory-repository/Inventories";
import Cookies from "js-cookie";
import {
  deleteCustomList,
  getUserCustomLists,
  getUserInventory,
} from "../../axios";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/datesFormatter";
import trashIcon from "../../assets/images/trashIcon.png";
import PageContext from "../../components/Contexts/PageContext";
import Spinner from "../../components/Spinner/Spinner";

const Lists = () => {
  // check if user is logged correctly
  useCheckLoggedUser();

  const token = Cookies.get("token");

  const { loading, setLoading } = useContext(PageContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [userCustomLists, setUserCustomLists] = useState<ICustomLists[]>([]);
  const [inventoryData, setInventoryData] = useState<IInventories[]>([]);

  const getInventoryAPI = useCallback(async () => {
    
    try {
      if (!token) throw new Error("No token provided");
      setLoading(true);

      const result = await getUserInventory(token);

      const resultData = result.data.userInventory;

      // filter result to check if there are items to buy in inventory
      const resultWithBuy = resultData.filter((item: any) => {
        const difference = item.minimumAmount - item.currentAmount;

        if (difference > 0) {
          return true;
        }
      });

      setInventoryData(resultWithBuy);

      setLoading(false);
    } catch (err: any) {
      setLoading(false);

      console.log(err.message);
    }
  }, [token, setLoading]);

  const getCustomListsAPI = useCallback(async () => {
    
    try {
      if (!token) throw new Error("No token provided");
      setLoading(true);
      const result = await getUserCustomLists(token);

      setUserCustomLists(result.data.userCustomLists);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err.message);
    }
  }, [token, setLoading]);

  const deleteCustomListAPI = async (e: MouseEvent, listId: string) => {
    e.preventDefault();

    
    try {
      if (!token) throw new Error("No token provided");
      setLoading(true);

      await deleteCustomList(token, listId);

      setLoading(false);

      getCustomListsAPI();
    } catch (err: any) {
      setLoading(false);

      console.log(err.message);
    }
  };

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

        {!loading &&
          userCustomLists.length <= 0 &&
          inventoryData.length <= 0 && (
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

        {loading && (
          <div className="loadingDiv">
            <Spinner loading={loading} />
          </div>
        )}

        {!loading &&
          (userCustomLists.length > 0 || inventoryData.length > 0) && (
            <>
              <div className={style.listsDiv}>
                {!loading && inventoryData.length > 0 && (
                  <Link to="/inventory/list" className={style.inventoryList}>
                    <div className={style.list}>
                      <div className={style.listHeader}>
                        <p>Inventory List</p>

                        <p>{inventoryData.length} Items</p>
                      </div>

                      <div className={style.bottomDiv}>
                        <div className={style.listDate}>
                          {formatDate(Date())}
                        </div>
                        <button className={style.settingsBtn}></button>
                      </div>
                    </div>
                  </Link>
                )}

                {!loading && userCustomLists.length > 0 && (
                  <div className={style.customListsDiv}>
                    {userCustomLists.map((list) => (
                      <Link
                        to={`/lists/${list.id}`}
                        key={list.id}
                        className={style.listDiv}
                      >
                        <div className={style.list}>
                          <div className={style.listHeader}>
                            <div className={style.listName}>{list.name}</div>

                            <p>{list.listItems.length} Items</p>
                          </div>

                          <div className={style.bottomDiv}>
                            <div className={style.listDate}>
                              {formatDate(list.date)}
                            </div>
                            <button className={style.settingsBtn}>
                              <img
                                className={`${style.trashIcon}`}
                                src={trashIcon}
                                alt="trash icon"
                                onClick={(e) => deleteCustomListAPI(e, list.id)}
                              />
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
      </main>
    </div>
  );
};

export default Lists;
