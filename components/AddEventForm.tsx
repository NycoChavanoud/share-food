import { useEffect, useState } from "react";
import style from "./styleComponents/AddEventForm.module.css";
import TitleSeparation from "./TitleSeparation";
import axios from "axios";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { IUser } from "../models/user";

const AddEventForm = () => {
  const { addToast } = useToasts();
  const dateOfDay = new Date().toISOString().substring(0, 10);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(dateOfDay);
  const [hour, setHour] = useState("12:30");
  const [description, setDescription] = useState("");
  const [typeEvent, setTypeEvent] = useState(" ");
  const [address, setAddress] = useState("");
  const [usersInvited, setUserInvited] = useState<any | null>([]);

  const router = useRouter();
  const [allUsers, setAllUsers] = useState<any[] | null>(null);

  const notify = () => {
    addToast("🦄 Super! tu as ajouté un nouvel évènement", {
      appearance: "success",
    });
  };

  const faild = () => {
    addToast("bad news! ton évènement n'a pas été posté...", {
      appearance: "error",
    });
  };
  const invitations = usersInvited.map((user: { value: IUser }) => ({
    guestId: user.value,
    status: "PENDING",
  }));

  const handlePostEvent = (e: any) => {
    e.preventDefault();
    axios
      .post(`/api/events `, {
        title,
        date,
        hour,
        description,
        typeEvent,
        address,
        invitations,
      })

      .then(() => notify())
      .then(() => router.push("/events"))
      .catch((err) => {
        console.error(err);
        faild();
      });
  };

  useEffect(() => {
    axios.get(`/api/users `).then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  const optionToCheck = allUsers?.map((user) => ({
    value: user.id,
    label: `${user.firstname} ${user.lastname}`,
  }));

  useEffect(() => {
    if (optionToCheck) {
      setUserInvited(optionToCheck);
    }
  }, [allUsers]);

  return (
    <form
      className={style.addEventFormContainer}
      onSubmit={handlePostEvent}
      data-cy="formAddEvent"
    >
      <div className={style.titleSeparationContainer}>
        <h3 className={style.titleSeparationTitle}>Infos générales</h3>

        <p className={style.titleSeparationContent}>
          Veuillez remplir les informations nécessaires à la création de votre
          évènement
        </p>
      </div>
      <label htmlFor="title" className={style.labelForm}>
        Titre de l&apos;évenement*
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
        maxLength={40}
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
            min={dateOfDay}
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
        required
      />
      <TitleSeparation
        title="Détails de l’évènement"
        content="Merci de préciser pour l’ensemble de vos hôtes les détails de votre évènement"
      />
      <label htmlFor="selectEventType" className={style.labelForm}>
        Type d’évènement :
      </label>
      <select
        className={style.selectInput}
        name="selectEventType"
        id="selectEventType"
        data-cy="selectEventType"
        value={typeEvent}
        onChange={(e) => setTypeEvent(e.target.value)}
      >
        <option className={style.optionInput}>
          -- Choisir dans la liste --
        </option>
        <option className={style.optionInput}>A la maison</option>
        <option className={style.optionInput}>Au bureau</option>
        <option className={style.optionInput} data-cy="restoType">
          Au resto
        </option>
        <option className={style.optionInput}>Autre...</option>
      </select>
      <label htmlFor="address" className={style.labelForm}>
        Adresse de l’évènement
      </label>
      <input
        type="text"
        id="address"
        data-cy="address"
        className={style.largeInputForm}
        autoComplete="off"
        required
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        maxLength={90}
      />
      <TitleSeparation
        title="Invitation des membres"
        content="Selectionnez les membres que vous souhaitez inviter à cet évènement"
      />
      <label htmlFor="selectMembers" className={style.labelForm}>
        Membres :
      </label>

      <Select
        id="selectbox"
        instanceId="selectbox"
        isMulti
        options={optionToCheck}
        value={usersInvited}
        onChange={(e) => {
          setUserInvited(e);
        }}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      {/* <button
        onClick={() => {
          setUserInvited(optionToCheck);
        }}
      >
        X
      </button> */}

      <button className={style.btnForm}>Valider</button>
    </form>
  );
};

export default AddEventForm;
