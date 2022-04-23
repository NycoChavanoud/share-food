import { IEvent } from "../../models/event";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import { getOneEvent, getEvents } from "../../models/event";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PrivateHeader from "../../components/PrivateHeader";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>("");

  const fetchOneEvent = (id: any) => {
    axios.get(`/api/event/${id} `).then((res) => setEvent(res.data));
  };

  useEffect(() => {
    fetchOneEvent(id);
  }, [id]);

  if (id) {
    return (
      <LayoutCurrentUser pageTitle={event.title}>
        <PrivateHeader title={event.title} />
        <div>{event.description}</div>
        <div>{event.date} </div>
        <div>{event.hour}</div>
        <div>{event.typeEvent} </div>
        <div>{event.adress} </div>
      </LayoutCurrentUser>
    );
  }
};

export default EventDetail;
