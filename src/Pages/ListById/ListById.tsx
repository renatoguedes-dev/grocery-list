import style from "./listById.module.css";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getListById } from "../../axios";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { IList } from "../../models/List";
import { formatDate } from "../../utils/datesFormatter";
import SettingsIcon from "../../components/icons/SettingsIcon/SettingsIcon";

const ListById = () => {
  const { id } = useParams();

  const token = Cookies.get("token");

  const [list, setList] = useState<IList | null>(null);
  const [listItems, setListItems] = useState(null);
  const [idNotFound, setIdNotFound] = useState(false);

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

  useEffect(() => {
    setIdNotFound(false);
    getListByIdAPI();
  }, [getListByIdAPI]);

  if (!list && idNotFound) {
    return <NotFoundPage />;
  }

  return (
    <>
      {list && !idNotFound && (
        <>
          <div className="container">
            <main className={`mainContainer ${style.mainContainer}`}>
              <div className={style.listHeader}>
                <h2>{list.name}</h2>
                <div className={style.settingsDiv}>
                  <SettingsIcon className={style.settingsIcon} />
                </div>
              </div>

              <div className={style.listBody}>
                <div className={style.dateDiv}>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Date: </span>
                    {formatDate(list.date)}{" "}
                  </p>
                </div>

                <div className={style.contentDiv}>
                  {!listItems && (
                    <>
                      <div>This list has no items yet.</div>
                      <button className={style.addItemBtn}>Add Item</button>
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
