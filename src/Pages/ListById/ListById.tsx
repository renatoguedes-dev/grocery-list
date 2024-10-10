import style from "./listById.module.css";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getListById, getListItems } from "../../axios";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { IList } from "../../models/List";
import { formatDate } from "../../utils/datesFormatter";
import ListItemModal from "../../components/Modals/ListItemModal/ListItemModal";
import { IListItem } from "../../models/IListItem";

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
          />
          <div className="container">
            <main className={`mainContainer ${style.mainContainer}`}>
              <div className={style.listHeader}>
                <h2>{list.name}</h2>
              </div>

              <div className={style.listBody}>
                <div className={style.dateDiv}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Date: </span>
                    {formatDate(list.date)}{" "}
                  </p>
                </div>

                <div className={style.contentDiv}>
                  {listItems.length <= 0 && (
                    <>
                      <div>This list has no items yet.</div>
                      <button
                        className={style.addItemBtn}
                        onClick={handleAddItem}
                      >
                        Add Item
                      </button>
                    </>
                  )}

                  {listItems.length > 0 && (
                    <>
                      <button
                        className={style.addItemBtn}
                        onClick={handleAddItem}
                      >
                        Add Item
                      </button>
                      {listItems.map((item) => (
                        <div key={item.id}>
                          <div>{item.name}</div>
                          <div>{item.amount}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default ListById;
