import { NextPage } from "next";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/Event.module.css";
import CurrentUserContext from "../../contexts/currentUserContext";
import { useContext, useEffect, useState } from "react";
import plusIcon from "../../public/icons/plus.png";
import Image from "next/image";

const Event: NextPage = (props) => {
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
    <>
      <LayoutCurrentUser pageTitle="Vos évènements">
        <div className={style.eventPageContainer}>
          <PrivateHeader
            title="Planning des évènements"
            firstname={firstname}
            lastname={lastname}
          />
          <div className={style.eventTitle}> A venir </div>

          <div className={style.eventPageInfo}>
            {/* <div className={style.eventTitle}> A venir </div> */}
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
            <div>TEST</div>
          </div>

          <div className={style.separationLine}></div>
        </div>
        <div className={style.addBtnContainer}>
          <Image src={plusIcon} width={40} height={40} alt="icon-plus" />
          <button className={style.addBtn}>créer nouvel evenement</button>
        </div>
      </LayoutCurrentUser>
    </>
  );
};

export default Event;
