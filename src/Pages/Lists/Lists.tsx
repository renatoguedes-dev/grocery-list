import style from "./lists.module.css";
import CreateCustomListBtn from "../../components/CreateCustomListBtn/CreateCustomListBtn";
import CreateInventoryListBtn from "../../components/CreateInventoryListBtn/CreateInventoryListBtn";
import Sidebar from "../../components/Sidebar/Sidebar";
import useCheckLoggedUser from "../../hooks/useCheckLoggedUser";

const Lists = () => {
    // check if user is logged correctly
    useCheckLoggedUser();

    return (
        <div className="container">
            <Sidebar />
            <main className={`mainContainer ${style.mainContainer}`}>
                <h2>You don't have any lists</h2>
                <p>
                    You can create custom lists or a list based on your
                    inventory.
                </p>
                <div className={style.btnsDiv}>
                    <CreateInventoryListBtn />
                    <CreateCustomListBtn />
                </div>
            </main>
        </div>
    );
};

export default Lists;
