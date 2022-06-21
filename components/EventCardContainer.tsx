import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import style from "./styleComponents/EventCardContainer.module.css";
import { useRouter } from "next/router";
import { Loading } from "./Loading";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const EventCardContainer = () => {
  const [eventList, setEventList] = useState<any[] | null>(null);
  const router = useRouter();

  const fetchEventList = () => {
    axios
      .get(`/api/events`)
      .then((res) => setEventList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEventList();
  }, []);

  if (!eventList) return <Loading />;

  if (eventList.length !== 0) {
    return (
      <div className={style.cardsContainer}>
        {eventList.map((event, index) => {
          const dateFormat = dayjs(event.date)
            .locale("fr")
            .format("dddd DD MMMM YYYY");

          const today = Date.now();
          const eventDate = new Date(event.date).getTime();
          const diffInms = eventDate - today;
          const dayRemaining = Math.ceil(diffInms / (1000 * 3600 * 24));

          return (
            <div
              data-cy="listEvent"
              key={index}
              onClick={() => {
                router.push(`/events/${event.id}`);
              }}
            >
              <EventCard
                title={event.title}
                date={dateFormat}
                hour={event.hour}
                diff={dayRemaining}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <>
        <p
          className={style.welcomtext}
          style={{
            fontSize: "1.4em",

            marginTop: "45px",
            color: "#9c1309",
            fontWeight: "normal",
          }}
        >
          Aucun évènement prévu
        </p>
      </>
    );
  }
};

export default EventCardContainer;
