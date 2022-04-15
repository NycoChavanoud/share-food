import style from "./styleComponents/HomeBtns.module.css";
import food from "../public/img/food.jpg";
import crew from "../public/img/crew.jpg";
import money from "../public/img/money.jpg";
import calendar from "../public/img/calendar.jpg";

const HomeBtns = () => {
  return (
    <div className={style.homeBtnContainer}>
      <div className={style.imgContainer}>
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${food.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>partager</h3>
      </div>

      <div className={style.imgContainer}>
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${crew.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>réunir</h3>
      </div>

      <div className={style.imgContainer}>
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${calendar.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>planifier</h3>
      </div>

      <div className={style.imgContainer}>
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${money.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>gérer</h3>
      </div>
    </div>
  );
};

export default HomeBtns;
