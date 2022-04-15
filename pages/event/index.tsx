import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import TitleSeparation from "../../components/TitleSeparation";
import style from "../../styles/Event.module.css";

const Event: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos évènements">
      <div className={style.eventPageContainer}>
        <div className={style.titleContainer}>
          <BackBtn />
          <h1 className={style.titlePage}>Page event</h1>
        </div>
        <TitleSeparation content="test" title="testtitle" />
      </div>
    </LayoutCurrentUser>
  );
};

export default Event;
