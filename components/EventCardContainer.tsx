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
    return (
      <div className={style.cardsContainer}>
        {eventList.map((event, index) => {
          const dateFormat = dayjs(event.date)
            .locale("fr")
            .format("dddd DD MMMM YYYY");
          console.log("date : ", dateFormat);
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
