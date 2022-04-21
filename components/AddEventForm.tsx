import { useState } from "react";
import style from "./styleComponents/AddEventForm.module.css";
import TitleSeparation from "./TitleSeparation";
import axios from "axios";
import { useRouter } from "next/router";

const AddEventForm = () => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();
  const day = new Date().getDate().toString();

  const dateOfTheDay =
    parseInt(month, 10) < 10
      ? `${year}-0${month}-${day}`
      : `${year}-${month}-${day}`;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(dateOfTheDay);
  const [hour, setHour] = useState("12:30");
  const [description, setDescription] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [adress, setAdress] = useState("");

  const router = useRouter();

  const handlePostEvent = (e: any) => {
    e.preventDefault();
    axios
      .post(`/api/event `, {
        title,
        date,
        hour,
        description,
        typeEvent,
        adress,
      })
      .then(() => alert("succès"))
      .then(() => {
        setTitle("");
        setDate(dateOfTheDay);
        setHour("12:30");
        setDescription("");
        setTypeEvent("");
        setAdress("");
      })
      .then(() => router.push("/event"));
  };

  return (
    <form className={style.addEventFormContainer} onSubmit={handlePostEvent}>
      <TitleSeparation
        title="Infos générales"
        content="Veuillez remplir les informations nécessaires à la création de votre évènement"
      />
      <label htmlFor="title" className={style.labelForm}>
        Titre de l’évènement*
      </label>
      <input
        type="text"
        id="title"
        data-cy="title"
        className={style.largeInputForm}
        autoComplete="off"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={style.containerMultiInput}>
        <div className={style.labelContainer}>
          <label htmlFor="datePicker" className={style.labelForm}>
            Date*
          </label>
          <input
            type="date"
            id="datePicker"
            data-cy="datePicker"
            className={style.littleInputForm}
            autoComplete="off"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={dateOfTheDay}
          />
        </div>

        <div className={style.labelContainer}>
          <label htmlFor="hourPicker" className={style.labelForm}>
            Heure*
          </label>
          <input
            type={"time"}
            id="hourPicker"
            data-cy="hourPicker"
            className={style.littleInputForm}
            autoComplete="off"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="description" className={style.labelForm}>
        Description
      </label>
      <textarea
        id="description"
        data-cy="description"
        className={style.textareaForm}
        autoComplete="off"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TitleSeparation
        title="Détails de l’évènement"
        content="Merci de préciser pour l’ensemnle de vos hotes les détails de votre évènement"
      />

      <label htmlFor="selectEventType" className={style.labelForm}>
        Type d’évènement :
      </label>
      <select
        className={style.selectInput}
        name="selectEventType"
        id="selectEventType"
        value={typeEvent}
        onChange={(e) => setTypeEvent(e.target.value)}
      >
        <option className={style.optionInput}>
          -- Choisir dans la liste --
        </option>
        <option className={style.optionInput}>A la maison</option>
        <option className={style.optionInput}>Au bureau</option>
        <option className={style.optionInput}>Au resto</option>
        <option className={style.optionInput}>Autre...</option>
      </select>

      <label htmlFor="adress" className={style.labelForm}>
        Adresse de l’évènement
      </label>
      <input
        type="text"
        id="adress"
        data-cy="adress"
        className={style.largeInputForm}
        autoComplete="off"
        required
        value={adress}
        onChange={(e) => setAdress(e.target.value)}
      />

      <button className={style.btnForm}>Valider</button>
    </form>
  );
};

export default AddEventForm;
