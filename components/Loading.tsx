import style from "./styleComponents/Loading.module.css";

export const Loading = () => {
  return (
    <>
      <div className={style.load} data-cy="loader">
        chargement des données
      </div>
      <div className={style.dots}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
