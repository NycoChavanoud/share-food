import { IEvent } from "../models/event";
import style from "./styleComponents/EventCard.module.css";

const EventCard = ({ title, date, hour }: Partial<IEvent>) => {
  return (
    <div className={style.eventCardContainer}>
      <div className={style.dateContainer}>
        <div className={style.dateEventCard}>
          <span className={style.boldText}> {date}</span> à{" "}
          <span className={style.boldText}> {hour}</span>
        </div>
        <div className={style.remainingDay}>J -10</div>
      </div>
      <div className={style.titleEventContainer}>{title}</div>
    </div>
  );
};

export default EventCard;
