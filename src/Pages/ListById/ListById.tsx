import style from "./listById.module.css";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ListById = () => {
  const { id } = useParams();

  const token = Cookies.get("token");

  const [list, setList] = useState<IList | null>(null);
  const [listItems, setListItems] = useState<IListItem[]>([]);
  const [idNotFound, setIdNotFound] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const getListByIdAPI = useCallback(async () => {
    if (!token) throw new Error("No token provided");

    try {
      const result = await getListById(token, id!);

      setList(result.data.requestedList);
    } catch (err: any) {
      setIdNotFound(true);
      console.log(err.message);
    }
  }, [token, id]);

  const getListItemsAPI = useCallback(async () => {
    if (!token) throw new Error("No token provided");

    const result = await getListItems(token, id!);

    setListItems(result.data);
  }, [token, id]);

  const updateCompleteStatusAPI = useCallback(
    async (listId: string, itemId: string, complete: boolean) => {
      if (!token) throw new Error("No token provided");

      await updateCompleteStatus(token, listId, itemId, !complete);

      getListItemsAPI();
    },
    [token, getListItemsAPI]
  );

  const deleteListItemAPI = useCallback(
    async (itemId: string) => {
      if (!token) throw new Error("No token provided");

      await deleteListItem(token, id!, itemId);

      getListItemsAPI();
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

  if (!list && idNotFound) {
    return <NotFoundPage />;
  }

  return (
    <>
      {list && !idNotFound && (
        <>
          <ListItemModal
            listId={id!}
            isOpen={isAddItemModalOpen}
            onClose={() => setIsAddItemModalOpen(false)}
            onUpdate={getListItemsAPI}
          />
          <div className="container">
            <main className={`mainContainer ${style.mainContainer}`}>
              <div className={style.listHeader}>
                <h2>{list.name}</h2>
              </div>

              <div className={style.listBody}>
                <div className={style.dateDiv}>
                  <p>{formatDate(list.date)} </p>
                </div>

                {listItems.length <= 0 && (
                  <div className={style.emptyListDiv}>
                    <div>This list has no items yet.</div>
                    <button
                      className={style.addItemBtn}
                      onClick={handleAddItem}
                    >
                      Add Item
                    </button>
                  </div>
                )}

                {listItems.length > 0 && (
                  <div className={style.contentDiv}>
                    <button
                      className={style.insideAddItemBtn}
                      onClick={handleAddItem}
                    >
                      <p>Add Item</p>
                    </button>

                    {listItems.map((item) => (
                      <div key={item.id} className={style.itemDiv}>
                        <input
                          type="checkbox"
                          className={style.checkboxDiv}
                          checked={item.complete}
                          onChange={() =>
                            updateCompleteStatusAPI(
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
          </div>
        </>
      )}
    </>
  );
};

export default ListById;
