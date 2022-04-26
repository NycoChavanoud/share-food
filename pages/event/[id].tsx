import style from "../../styles/Event.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import EventDetailHeader from "../../components/EventDetailHeader";
import { Loading } from "../../components/Loading";
import ValidateDelete from "../../components/ValidateDelete";
import { useToasts } from "react-toast-notifications";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>("");
  const [deleteContainer, setDeleteContainer] = useState(false);
  const { addToast } = useToasts();

  const notifySuccess = () => {
    addToast("🦄 Ton évènement est supprimé", {
      appearance: "success",
    });
  };

  useEffect(() => {
    axios.get(`/api/event/${id} `).then((res) => setEvent(res.data));
  }, [id]);

  if (id) {
    const dateFormat = dayjs(event.date)
      .locale("fr")
      .format("dddd DD MMMM YYYY");
    return (
      <LayoutCurrentUser pageTitle={`évènement : ${event.title}`}>
        {deleteContainer ? (
          <ValidateDelete
            id={id}
            deleteContainer={deleteContainer}
            setDeleteContainer={setDeleteContainer}
            notifySuccess={notifySuccess}
            type={"cet évènement"}
            message={"cette action est irréversible et supprimera l’évènement"}
          />
        ) : null}
        <EventDetailHeader
          title={event.title}
          date={dateFormat}
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

          <button
            onClick={() => {
              setDeleteContainer(!deleteContainer);
            }}
            className={style.btnDeleteEvent}
          >
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
