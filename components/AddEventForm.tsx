import style from "./styleComponents/AddEventForm.module.css";
import TitleSeparation from "./TitleSeparation";

const AddEventForm = () => {
  return (
    <form className={style.addEventFormContainer}>
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
      />

      {/* <div className={style.containerMultiInput}>
        <div className={style.labelContainer}>
          <label htmlFor="nickName" className={style.labelForm}>
            Pseudo* :
          </label>
          <input
            type="text"
            id="nickName"
            data-cy="nickName"
            className={style.littleInputForm}
            autoComplete="off"
          />
        </div>

        <div className={style.labelContainer}>
          <label htmlFor="datePicker" className={style.labelForm}>
            Anniversaire :
          </label>
          <input
            type="date"
            id="datePicker"
            data-cy="datePicker"
            className={style.littleInputForm}
            autoComplete="off"
          />
        </div>
      </div>

      <div className={style.containerMultiInput}>
        <div className={style.labelContainer}>
          <label htmlFor="firstname" className={style.labelForm}>
            Prénom :
          </label>
          <input
            type="text"
            id="firstname"
            data-cy="firstname"
            className={style.littleInputForm}
            autoComplete="off"
          />
        </div>

        <div className={style.labelContainer}>
          <label htmlFor="datePlastnameicker" className={style.labelForm}>
            Nom :
          </label>
          <input
            type="text"
            id="lastname"
            data-cy="lastname"
            className={style.littleInputForm}
            autoComplete="off"
          />
        </div>
      </div>

      <label htmlFor="favoritePlate" className={style.labelForm}>
        Plat signature :
      </label>
      <input
        type="text"
        id="favoritePlate"
        data-cy="favoritePlate"
        className={style.largeInputForm}
        autoComplete="off"
        required
      /> */}
      <button className={style.btnForm}>Valider</button>
    </form>
  );
};

export default AddEventForm;
