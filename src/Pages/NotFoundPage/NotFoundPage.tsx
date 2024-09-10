import { Link } from "react-router-dom";
import style from "./notFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <div className={style.mainContainer}>
            <h1>The page you are trying to access doesn't exist</h1>
            <span>
                Back to <Link to="/">Homepage</Link>
            </span>
            
        </div>
    );
};

export default NotFoundPage;
