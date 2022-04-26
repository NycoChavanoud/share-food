import { useRouter } from "next/router";
import { useState } from "react";
import style from "./styleComponents/RegisterForm.module.css";
import TitleSeparation from "./TitleSeparation";

import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstname, setFirsname] = useState("");
  const [lastname, setLastname] = useState("");
  const [favoritePlate, setFavoritePlate] = useState("");

  const router = useRouter();

  const handleCreateCount = (e: any) => {
    e.preventDefault();
    axios
      .post(`/api/register `, {
        firstname,
        lastname,
        email,
        nickName,
        birthday,
        favoritePlate,
        password,
      })

      .then(() => {
        setFirsname("");
        setLastname("");
        setEmail("");
        setBirthday("");
        setConfirm("");
        setPassword("");
        setNickName("");
        setFavoritePlate("");
      })

      .then(() => router.push("/"));
  };

  return (
    <form className={style.registerFormContainer} onSubmit={handleCreateCount}>
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
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
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
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
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
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
            value={firstname}
            onChange={(e) => setFirsname(e.target.value)}
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
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
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
        value={favoritePlate}
        onChange={(e) => setFavoritePlate(e.target.value)}
      />
      <button className={style.btnForm}>Valider</button>
    </form>
  );
};

export default RegisterForm;
