import style from "./listById.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  deleteListItem,
  getListById,
  getListItems,
  updateCompleteStatus,
} from "../../axios";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { IList } from "../../models/List";
import { formatDate } from "../../utils/datesFormatter";
import ListItemModal from "../../components/Modals/ListItemModal/ListItemModal";
import { IListItem } from "../../models/IListItem";
import trashIcon from "../../assets/images/trashIcon.png";
import BackArrowIcon from "../../components/icons/BackArrowIcon";
import PageContext from "../../components/Contexts/PageContext";
import Spinner from "../../components/Spinner/Spinner";

const ListById = () => {
  const { id } = useParams();

  const token = Cookies.get("token");

  const { loading, setLoading } = useContext(PageContext);

  const [list, setList] = useState<IList | null>(null);
  const [listItems, setListItems] = useState<IListItem[]>([]);
  const [localListItems, setLocalListItems] = useState<IListItem[]>([]);
  const [idNotFound, setIdNotFound] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const getListByIdAPI = useCallback(async () => {
    try {
      if (!token) throw new Error("No token provided");
      setLoading(true);

      const result = await getListById(token, id!);

      setList(result.data.requestedList);

      setLoading(false);
    } catch (err: any) {
      setIdNotFound(true);

      setLoading(false);

      console.log(err.message);
    }
  }, [token, id, setLoading]);

  const getListItemsAPI = useCallback(async () => {
    try {
      if (!token) throw new Error("No token provided");

      const result = await getListItems(token, id!);

      setListItems(result.data);
    } catch (err: any) {
      console.log(err.message);
    }
  }, [token, id]);

  const handleCompleteStatus = (
    listId: string,
    itemId: string,
    complete: boolean
  ) => {
    setLocalListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.listId === listId
          ? { ...item, complete: !complete }
          : item
      )
    );

    updateCompleteStatusAPI(listId, itemId, complete);
  };

  const updateCompleteStatusAPI = useCallback(
    async (listId: string, itemId: string, complete: boolean) => {
      try {
        if (!token) throw new Error("No token provided");

        await updateCompleteStatus(token, listId, itemId, !complete);

        getListItemsAPI();
      } catch (err: any) {
        console.log(err.message);
      }
    },
    [token, getListItemsAPI]
  );

  const deleteListItemAPI = useCallback(
    async (itemId: string) => {
      try {
        if (!token) throw new Error("No token provided");

        await deleteListItem(token, id!, itemId);

        getListItemsAPI();
      } catch (err: any) {
        console.log(err.message);
      }
    },
    [token, id, getListItemsAPI]
  );

  const handleAddItem = () => {
    setIsAddItemModalOpen(true);
  };

  useEffect(() => {
    setIdNotFound(false);

    getListByIdAPI();
    getListItemsAPI();
  }, [getListByIdAPI, getListItemsAPI]);

  useEffect(() => {
    if (localListItems.length !== listItems.length) {
      setLocalListItems(listItems);
    }
  }, [localListItems, listItems]);

  if (!list && idNotFound) {
    return <NotFoundPage />;
  }

  return (
    <div className={`container ${style.container}`}>
      {loading && (
        <div className="loadingDiv" style={{ marginTop: "100px" }}>
          <Spinner loading={loading} />
        </div>
      )}

      {!loading && list && !idNotFound && (
        <>
          <ListItemModal
            listId={id!}
            isOpen={isAddItemModalOpen}
            onClose={() => setIsAddItemModalOpen(false)}
            onUpdate={getListItemsAPI}
          />

          <main className={`mainContainer ${style.mainContainer}`}>
            <Link to="/lists">
              <BackArrowIcon className={style.backArrowIcon} />
            </Link>
            <div className={style.listHeader}>
              <h2>{list.name}</h2>
            </div>

            <div className={style.listBody}>
              <div className={style.dateDiv}>
                <p>{formatDate(list.date)} </p>
              </div>

              {localListItems.length <= 0 && (
                <div className={style.emptyListDiv}>
                  <div>This list has no items yet.</div>
                  <button className={style.addItemBtn} onClick={handleAddItem}>
                    Add Item
                  </button>
                </div>
              )}

              {localListItems.length > 0 && (
                <div className={style.contentDiv}>
                  <button
                    className={style.insideAddItemBtn}
                    onClick={handleAddItem}
                  >
                    <p>Add Item</p>
                  </button>

                  {localListItems.map((item) => (
                    <div key={item.id} className={style.itemDiv}>
                      <input
                        type="checkbox"
                        className={style.checkboxDiv}
                        checked={item.complete}
                        onChange={() =>
                          handleCompleteStatus(
                            item.listId,
                            item.id,
                            item.complete
                          )
                        }
                      />
                      <div className={style.itemNameDiv}>{item.name}</div>
                      <div className={style.itemAmountDiv}>{item.amount}</div>
                      <img
                        className={`${style.trashIcon} ${style.icons}`}
                        src={trashIcon}
                        alt="trash icon"
                        onClick={() => deleteListItemAPI(item.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default ListById;
