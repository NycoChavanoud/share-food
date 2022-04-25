import style from "../../styles/Event.module.css";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventDetailHeader from "../../components/EventDetailHeader";
import { Loading } from "../../components/Loading";
import ValidateDelete from "../../components/ValidateDelete";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const EventDetail = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>("");
  const [deleteContainer, setDeleteContainer] = useState(false);

  const notifySuccess = (text: string) =>
    toast.success(text, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

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
