import style from "./styleComponents/PrivateHeader.module.css";
import fondBois from "../public/img/fond-bois.jpg";
import Router from "next/router";
import Image from "next/image";
import backLight from "../public/icons/backLight.png";

type privateHeadProps = {
  title: string;
  firstname: string;
  lastname: string;
};

const PrivateHeader = ({ title, firstname, lastname }: privateHeadProps) => {
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
          {firstname} {lastname} de la fuente de de de
        </h1>
        <div className={style.subtitle}>{title}</div>
      </div>
    </div>
  );
};

export default PrivateHeader;
