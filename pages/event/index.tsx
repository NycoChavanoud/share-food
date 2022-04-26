import { NextPage } from "next";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/Event.module.css";
import plusIcon from "../../public/icons/plus.png";
import Image from "next/image";
import { useRouter } from "next/router";
import EventCardContainer from "../../components/EventCardContainer";
import Router from "next/router";


const Event: NextPage = (props) => {
  const router = useRouter();

  return (
    <>
      <LayoutCurrentUser pageTitle="Vos évènements">
        <div className={style.eventPageContainer}>
          <PrivateHeader
            title="Planning des évènements"
            router={() => {
              Router.push("/event");
            }}
          />
          <div
            className={style.addBtnContainer}
            onClick={() => router.push("/event/create")}
            data-cy="createBtn"
          >
            <Image src={plusIcon} width={40} height={40} alt="icon-plus" />
            <button className={style.addBtn}>créer nouvel evenement</button>
          </div>
          <div className={style.eventTitle}> A venir </div>

          <div className={style.eventPageInfo}>
            <EventCardContainer />
          </div>

          <div className={style.separationLine}></div>
        </div>
   
      </LayoutCurrentUser>
    </>
  );
};

export default Event;
