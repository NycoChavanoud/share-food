import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import EventDetailHeader from "../../components/EventDetailHeader";

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
      <LayoutCurrentUser pageTitle={`évènement : ${event.title}`}>
        <EventDetailHeader
          title={event.title}
          date={event.date}
          hour={event.hour}
          adress={event.adress}
          id={event.id}
        />

        <div>{event.description}</div>
        <div>{event.typeEvent} </div>
      </LayoutCurrentUser>
    );
  }
};

export default EventDetail;
