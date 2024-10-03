import { Link } from "react-router-dom";
import style from "./notFoundPage.module.css";
import notFoundImage from "../../assets/images/404notfound.jpg"

const NotFoundPage = () => {
    return (
        <div className="container">
            <div className={`mainContainer ${style.mainContainer}`}>
                <img className={style.notFoundImage} src={notFoundImage} alt="" />
                <h2>We can't seem to find the page you're looking for.</h2>
                <span>
                    Back to{" "}
                    <Link to="/" className={style.link}>
                        Homepage
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default NotFoundPage;
