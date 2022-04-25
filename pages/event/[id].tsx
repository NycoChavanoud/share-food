import style from "../../styles/Event.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import EventDetailHeader from "../../components/EventDetailHeader";
import { Loading } from "../../components/Loading";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>("");
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    axios.get(`/api/event/${id} `).then((res) => setEvent(res.data));
  }, [id]);

  const deleteEvent = () => {
    axios.delete(`/api/event/${id}`).then(() => router.push("/event"));
  };

  if (id) {
    return (
      <LayoutCurrentUser pageTitle={`évènement : ${event.title}`}>
        <EventDetailHeader
          title={event.title}
          date={event.date}
          hour={event.hour}
          adress={event.adress}
          id={event.id}
        />
        <div className={style.descriptionDetailEventContainer}>
          <div className={style.titleDescription}>Description</div>
          <div className={style.detailDescription}>{event.description}</div>
          <div className={style.titleDescription}>Détails</div>
          <div className={style.detailTypeEvent}>
            Cela se passe &quot;{event.typeEvent}&quot;
          </div>
          <button onClick={deleteEvent} className={style.btnDeleteEvent}>
            SUPPRIMER
          </button>
        </div>
      </LayoutCurrentUser>
    );
  } else {
    return <Loading />;
  }
};

export default EventDetail;
