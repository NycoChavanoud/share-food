import { NextPage } from "next";
import AddEventForm from "../../components/AddEventForm";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/EventCreate.module.css";
import Router from "next/router";

const Create: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Création d'évènement">
      <div className={style.eventCreateContainer}>
        <PrivateHeader
          title="Création d’évènement"
          router={() => {
            Router.push("/events");
          }}
        />
      </div>
      <AddEventForm />
    </LayoutCurrentUser>
  );
};
export default Create;
