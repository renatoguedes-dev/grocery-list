import style from "./lists.module.css";
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
                    <button className={style.buttons}>
                        Create Custom List
                    </button>
                    <button className={style.buttons}>
                        Create Inventory List
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Lists;
