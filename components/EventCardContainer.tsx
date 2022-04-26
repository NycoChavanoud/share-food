import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import style from "./styleComponents/EventCardContainer.module.css";
import { useRouter } from "next/router";
import { Loading } from "./Loading";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const EventCardContainer = () => {
  const [eventList, setEventList] = useState<any[]>([]);
  const router = useRouter();

  const fetchEventList = () => {
    axios.get(`/api/event `).then((res) => setEventList(res.data));
  };

  useEffect(() => {
    fetchEventList();
  }, []);

  if (eventList != []) {
    const eventListWithoutPast = eventList.filter((event) => {
      const today = Date.now();
      const eventDate = new Date(event.date).getTime();
      const diffInms = eventDate - today;
      const dayRemaining = Math.ceil(diffInms / (1000 * 3600 * 24));

      return dayRemaining >= 0;
    });

    return (
      <div className={style.cardsContainer}>
        {eventListWithoutPast.map((event, index) => {
          const dateFormat = dayjs(event.date)
            .locale("fr")
            .format("dddd DD MMMM YYYY");

          const today = Date.now();
          const eventDate = new Date(event.date).getTime();
          const diffInms = eventDate - today;
          const dayRemaining = Math.ceil(diffInms / (1000 * 3600 * 24));

          return (
            <div
              key={index}
              onClick={() => {
                router.push(`/event/${event.id}`);
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
    return <Loading />;
  }
};

export default EventCardContainer;
