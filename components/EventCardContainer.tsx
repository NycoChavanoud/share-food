import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import style from "./styleComponents/EventCardContainer.module.css";
import { useRouter } from "next/router";

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
          return (
            <div
              key={index}
              onClick={() => {
                router.push(`/event/${event.id}`);
              }}
            >
              <EventCard
                title={event.title}
                date={event.date}
                hour={event.hour}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <span>LOADING</span>;
  }
};

export default EventCardContainer;
