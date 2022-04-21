import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import style from "./styleComponents/EventCardContainer.module.css";

const EventCardContainer = () => {
  const [eventList, setEventList] = useState<any[]>([]);

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
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              hour={event.hour}
            />
          );
        })}
      </div>
    );
  } else {
    return <span>LOADING</span>;
  }
};

export default EventCardContainer;
