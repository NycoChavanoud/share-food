import style from "./styleComponents/PrivateHeader.module.css";
import fondBois from "../public/img/fond-bois.jpg";
import Image from "next/image";
import backLight from "../public/icons/backLight.png";
import { useContext } from "react";
import CurrentUserContext from "../contexts/currentUserContext";

type privateHeadProps = {
  title: string;
  router: any;
  rightElement?: React.ReactElement | boolean;
  firstname?: string;
  lastname?: string;
};

const PrivateHeader = ({
  title,
  router,
  rightElement,
  firstname,
  lastname,
}: privateHeadProps) => {
  const { currentUserProfile } = useContext(CurrentUserContext);

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
        onClick={router}
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
      <div>{rightElement}</div>
    </div>
  );
};

export default PrivateHeader;
