import style from "./homepage.module.css";
import Header from "../Header/Header";

function Homepage() {
    return (
        <div className={style.root}>
            <Header />

            <div className={style.messageDiv}>
                <h2 className={style.message}>
                    Always forgetting what you need when you go grocery
                    shopping?
                </h2>
                <h2 className={style.message}>
                    Create a grocery list based on what you have at home, or
                    start a custom list just for you.
                </h2>
            </div>
        </div>
    );
}

export default Homepage;
