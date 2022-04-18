import style from "./styleComponents/PrivateHeader.module.css";
import fondBois from "../public/img/fond-bois.jpg";
import Router from "next/router";
import Image from "next/image";
import backLight from "../public/icons/backLight.png";

import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/currentUserContext";

type privateHeadProps = {
  title: string;
};

const PrivateHeader = ({ title }: privateHeadProps) => {
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
    <div
      className={style.privateHeaderContainer}
      style={{
        backgroundImage: `url(${fondBois.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <button
        onClick={() => {
          Router.back();
        }}
        style={{
          border: "none",
          background: "transparent",

          cursor: "pointer",
        }}
      >
        {" "}
        <Image src={backLight} alt="back-icon" width={35} height={35} />{" "}
      </button>
      <div className={style.privateInfoContainer}>
        <h1 className={style.nameTitle}>
          {" "}
          {firstname} {lastname}
        </h1>
        <div className={style.subtitle}>{title}</div>
      </div>
    </div>
  );
};

export default PrivateHeader;
