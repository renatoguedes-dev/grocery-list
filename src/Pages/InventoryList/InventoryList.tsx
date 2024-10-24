import { useCallback, useEffect, useState } from "react";
import style from "./inventoryList.module.css";
import { IInventories } from "../../In-memory-repository/Inventories";
import Cookies from "js-cookie";
import { getUserInventory } from "../../axios";
import { formatDate } from "../../utils/datesFormatter";

const InventoryList = () => {
  const token = Cookies.get("token");

  const [inventoryData, setInventoryData] = useState<IInventories[]>([]);

  const getInventoryAPI = useCallback(async () => {
    try {
      if (!token) throw new Error("No token provided");
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
    } catch (err: any) {
      console.log(err.message);
    }
  }, [token]);

  useEffect(() => {
    getInventoryAPI();
  }, [getInventoryAPI]);

  return (
    <div className="container">
      <main className={`mainContainer ${style.mainContainer}`}>
        <div className={style.listHeader}>
          <h2>Inventory List</h2>
        </div>

        <div className={style.listBody}>
          <div className={style.dateDiv}>
            <p>{formatDate(Date())} </p>
          </div>

          <div className={style.contentDiv}>
            {inventoryData.length > 0 && (
              <div className={style.contentDiv}>
                {inventoryData.map((item) => (
                  <div key={item.id} className={style.itemDiv}>
                    <div className={style.leftSide}>
                      <input type="checkbox" className={style.checkboxDiv} />
                      <div className={style.itemNameDiv}>{item.item}</div>
                    </div>

                    <div className={style.rightSide}>
                      <div className={style.itemAmountDiv}>
                        {item.minimumAmount - item.currentAmount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryList;
