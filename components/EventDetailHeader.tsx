import style from "./styleComponents/EventDetailHeader.module.css";
import { IEvent } from "../models/event";
import fondBois from "../public/img/fond-bois.jpg";
import Arrow from "../public/icons/backDark.png";
import Image from "next/image";
import Router from "next/router";
import CurrentUserContext from "../contexts/currentUserContext";
import { useContext, useEffect, useState } from "react";

const EventDetailHeader = ({ title, date, hour, adress }: Partial<IEvent>) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { currentUserProfile } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUserProfile) {
      setFirstname(currentUserProfile.firstname);
      setLastname(currentUserProfile.lastname);
    }
  }, [currentUserProfile]);

  return (
    <div className={style.HeaderDetailContainer}>
      <span
        className={style.woodPlank}
        style={{
          backgroundImage: `url(${fondBois.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className={style.nameAndBackContainer}>
        <button
          data-cy="backBtn"
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            Router.back();
          }}
        >
          <Image src={Arrow} width={35} height={35} alt="logo-flèche" />
        </button>
        <div className={style.nameInfo}>
          {" "}
          {firstname} {lastname}
        </div>
      </div>

      <div className={style.titleInfo}>{title}</div>

      <div className={style.dateAndAdressContainer}>
        <div className={style.dateInfo}>
          Le {date} à {hour}
        </div>
        <div className={style.adressInfo}>{adress}</div>
      </div>
      <span
        className={style.woodPlank}
        style={{
          backgroundImage: `url(${fondBois.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default EventDetailHeader;
