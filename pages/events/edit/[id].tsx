import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import style from "../../../styles/EditEvent.module.css";
import { useContext, useEffect, useState } from "react";
import LayoutCurrentUser from "../../../components/LayoutCurrentUser";
import PrivateHeader from "../../../components/PrivateHeader";
import CurrentUserContext from "../../../contexts/currentUserContext";
import TitleSeparation from "../../../components/TitleSeparation";
import Select from "react-select";

const EditEvent: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<any>("");
  const [usersInvited, setUserInvited] = useState<any | null>();
  const [allUsers, setAllUsers] = useState<any[] | null>(null);
  const { currentUserProfile } = useContext(CurrentUserContext);
  const dateOfDay = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    axios
      .get(`/api/events/${id} `)
      .then((res) => {
        setEvent(res.data);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    axios.get(`/api/users `).then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  const optionToCheck = allUsers
    ?.filter((user) => user.id !== currentUserProfile?.id)
    .map((user) => ({
      value: user.id,
      label: `${user.firstname} ${user.lastname}`,
    }));

  useEffect(() => {
    if (optionToCheck) {
      setUserInvited(optionToCheck);
    }
  }, [allUsers]);

  const handlePatchEvent = (e: any) => {
    e.preventDefault();
    axios
      .patch(`/api/events/${id} `, {
        id: event.id,
        title: event.title,
        date: event.date,
        hour: event.hour,
        description: event.description,
        typeEvent: event.typeEvent,
        address: event.address,
        authorId: event.authorId,
        invitations: usersInvited.map((i: { value: any }) => ({
          guestId: i.value,
        })),
      })
      .then(() => router.push(`/events/${id}`));
  };

  return (
    <LayoutCurrentUser pageTitle={`modifier : ${event.title}`}>
      <div className={style.editEventPageContainer}>
        <PrivateHeader
          firstname={currentUserProfile?.firstname}
          lastname={currentUserProfile?.lastname}
          title={`modification de ${event.title}`}
          router={() => {
            router.back();
          }}
        />
        <form
          className={style.addEventFormContainer}
          onSubmit={handlePatchEvent}
          data-cy="formAddEvent"
        >
          <div className={style.titleSeparationContainer}>
            <h3 className={style.titleSeparationTitle}>Infos générales</h3>

            <p className={style.titleSeparationContent}>
              Veuillez remplir les informations nécessaires à la création de
              votre évènement
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
            value={event.title || " "}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
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
                value={event.date || " "}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
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
                value={event.hour || ""}
                onChange={(e) => setEvent({ ...event, hour: e.target.value })}
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
            value={event.description || ""}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
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
            value={event.typeEvent}
            onChange={(e) => setEvent({ ...event, typeEvent: e.target.value })}
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
            value={event.address || ""}
            onChange={(e) => setEvent({ ...event, address: e.target.value })}
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

          {/* {usersInvited.length === 0 && (
            <button
              type="button"
              onClick={() => {
                setUserInvited(optionToCheck);
              }}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "Amiko",
                color: "var(--redColor)",
                margin: "10px auto",
                fontWeight: "600",
              }}
            >
              ajouter tous les membres de ma liste
            </button>
          )} */}

          <button className={style.btnForm}>Valider</button>
        </form>
      </div>
    </LayoutCurrentUser>
  );
};

export default EditEvent;
