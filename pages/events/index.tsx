import { NextPage } from "next";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/Event.module.css";
import plusIcon from "../../public/icons/plus.png";
import Image from "next/image";
import { useRouter } from "next/router";
import EventCardContainer from "../../components/EventCardContainer";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import InviteValidation from "../../components/InviteValidation";

const Event: NextPage = (props) => {
  const router = useRouter();
  const { currentUserProfile } = useContext(CurrentUserContext);

  return (
    <>
      <LayoutCurrentUser pageTitle="Vos évènements">
        <div className={style.eventPageContainer}>
          <PrivateHeader
            firstname={currentUserProfile?.firstname}
            lastname={currentUserProfile?.lastname}
            title="Planning des évènements"
            router={() => {
              router.push("/dashboard");
            }}
          />
          <div
            className={style.addBtnContainer}
            onClick={() => router.push("/events/create")}
            data-cy="createBtn"
          >
            <Image src={plusIcon} width={40} height={40} alt="icon-plus" />
            <button className={style.addBtn}>créer nouvel evenement</button>
          </div>
          <div className={style.eventTitle}> A venir </div>

          <div className={style.eventPageInfo}>
            <EventCardContainer />
          </div>

          <span className={style.separationLine} />
          <div className={style.actionPageInfo}>
            <InviteValidation />
          </div>
        </div>
      </LayoutCurrentUser>
    </>
  );
};

export default Event;
