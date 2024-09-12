import style from "./myLists.module.css";
import CreateCustomListBtn from "../CreateCustomListBtn/CreateCustomListBtn";
import CreateInventoryListBtn from "../CreateInventoryListBtn/CreateInventoryListBtn";

const MyLists = () => {
    return (
        <main className={style.mainContainer}>
            <h2>You don't have any lists</h2>
            <p>
                You can create custom lists or a list based on your inventory.
            </p>
            <div className={style.btnsDiv}>
                <CreateInventoryListBtn />
                <CreateCustomListBtn />
            </div>
        </main>
    );
};

export default MyLists;
