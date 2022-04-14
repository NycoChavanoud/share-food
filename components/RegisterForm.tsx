import style from "./styleComponents/RegisterForm.module.css";

import TitleSeparation from "./titleSeparation";

const RegisterForm = () => {
  return (
    <form className={style.registerFormContainer}>
      <label htmlFor="email" className={style.labelForm}>
        Votre email* :
      </label>
      <input
        type="email"
        id="email"
        data-cy="email"
        className={style.inputForm}
        autoComplete="off"
        required
      />

      <label htmlFor="password" className={style.labelForm}>
        Mot de passe* :
      </label>
      <input
        type="password"
        id="password"
        data-cy="password"
        className={style.inputForm}
        autoComplete="off"
        required
      />

      <label htmlFor="confirmPassword" className={style.labelForm}>
        Confirmation* :
      </label>
      <input
        type="password"
        id="confirmPassword"
        data-cy="confirmPassword"
        className={style.inputForm}
        autoComplete="off"
        required
      />

      <TitleSeparation
        title="Infos profil"
        content="Vous pourrez enrichir votre profil après  inscription "
      />

      <div className={style.containerMultiInput}>
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
      />
      <button className={style.btnForm}>Valider</button>
    </form>
  );
};

export default RegisterForm;
