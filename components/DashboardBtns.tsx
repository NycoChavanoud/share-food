import style from "./styleComponents/HomeBtns.module.css";
import food from "../public/img/food.jpg";
import crew from "../public/img/crew.jpg";
import friends from "../public/img/friends.jpg";
import calendar from "../public/img/calendar.jpg";
import Link from "next/link";

const DashboardBtns = () => {
  return (
    <div className={style.homeBtnContainer}>
      <div
        className={style.imgContainer}
        style={{ opacity: "0.5", cursor: "not-allowed" }}
      >
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${friends.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>Mes amis</h3>
      </div>

      <Link href={"/events"}>
        <div className={style.imgContainer}>
          <div
            className={style.imgDiv}
            style={{
              backgroundImage: `url(${calendar.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <h3 className={style.titleImg}>Mes évènements</h3>
        </div>
      </Link>

      <div
        className={style.imgContainer}
        style={{ opacity: "0.5", cursor: "not-allowed" }}
      >
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${crew.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>Mes groupes</h3>
      </div>

      <div
        className={style.imgContainer}
        style={{ opacity: "0.5", cursor: "not-allowed" }}
      >
        <div
          className={style.imgDiv}
          style={{
            backgroundImage: `url(${food.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <h3 className={style.titleImg}>Mes créations</h3>
      </div>
    </div>
  );
};

export default DashboardBtns;
