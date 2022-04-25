import React from "react";
import { IEvent } from "../models/event";
import style from "./styleComponents/EventCard.module.css";

const EventCard = ({ title, date, hour, diff }: Partial<IEvent>) => {
  return (
    <div className={style.eventCardContainer}>
      <div className={style.dateContainer}>
        <div className={style.dateEventCard}>
          <span className={style.boldText}> {date}</span> à{" "}
          <span className={style.boldText}> {hour}</span>
        </div>
        <div>
          {diff === 0 ? (
            <span className={style.today}>Aujourd&apos;hui</span>
          ) : (
            <span className={style.remainingDay}> j - {diff}</span>
          )}
        </div>
      </div>
      <div className={style.titleEventContainer}>{title}</div>
    </div>
  );
};

export default EventCard;
