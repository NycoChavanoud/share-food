import { NextPage } from "next";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import PrivateHeader from "../../components/PrivateHeader";
import style from "../../styles/Event.module.css";
import CurrentUserContext from "../../contexts/currentUserContext";
import { useContext, useEffect, useState } from "react";

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
    <LayoutCurrentUser pageTitle="Vos évènements">
      <div className={style.eventPageContainer}>
        <PrivateHeader
          title="Planning des évènements"
          firstname={firstname}
          lastname={lastname}
        />
      </div>
    </LayoutCurrentUser>
  );
};

export default Event;
