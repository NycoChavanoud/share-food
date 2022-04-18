import { NextPage } from "next";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/Event.module.css";
import CurrentUserContext from "../../contexts/currentUserContext";
import { useContext, useEffect, useState } from "react";
import plusIcon from "../../public/icons/plus.png";
import Image from "next/image";
import Router, { useRouter } from "next/router";

const Event: NextPage = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { currentUserProfile } = useContext(CurrentUserContext);

  const router = useRouter();

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
            <div>ICI LISTE DES EVENTS DEPUIS LA DB</div>
            <div>ICI LISTE DES EVENTS DEPUIS LA DB</div>
            <div>ICI LISTE DES EVENTS DEPUIS LA DB</div>
            <div>ICI LISTE DES EVENTS DEPUIS LA DB</div>
            <div>ICI LISTE DES EVENTS DEPUIS LA DB</div>
            <div>ICI LISTE DES EVENTS DEPUIS LA DB</div>
          </div>

          <div className={style.separationLine}></div>
        </div>
        <div
          className={style.addBtnContainer}
          onClick={() => router.push("/event/create")}
          data-cy="createBtn"
        >
          <Image src={plusIcon} width={40} height={40} alt="icon-plus" />
          <button className={style.addBtn}>créer nouvel evenement</button>
        </div>
      </LayoutCurrentUser>
    </>
  );
};

export default Event;
