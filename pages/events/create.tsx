import { NextPage } from "next";
import AddEventForm from "../../components/AddEventForm";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/EventCreate.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

const Create: NextPage = (props) => {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const router = useRouter();
  return (
    <LayoutCurrentUser pageTitle="Création d'évènement">
      <div className={style.eventCreateContainer}>
        <PrivateHeader
          firstname={currentUserProfile?.firstname}
          lastname={currentUserProfile?.lastname}
          title="Création d’évènement"
          router={() => {
            router.push("/events");
          }}
        />
      </div>
      <AddEventForm />
    </LayoutCurrentUser>
  );
};
export default Create;
