import style from "./styleComponents/ValidateDelete.module.css";
import valideIcon from "../public/icons/valide.png";
import annuleIcon from "../public/icons/annule.png";
import Image from "next/image";

type validateDeleteProps = {
  type: string;
  deleteContainer: any;
  setDeleteContainer: any;
  message: string;
  handleDelete: () => Promise<any>;
};

const ValidateDelete = ({
  type,
  message,
  handleDelete,
  deleteContainer,
  setDeleteContainer,
}: validateDeleteProps) => {
  return (
    <div className={style.overlay}>
      <div className={style.deleteContainer}>
        <p>Etes-vous certain de vouloir supprimer {type}?</p>
        <div className={style.validationBtns}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setDeleteContainer(!deleteContainer);
            }}
          >
            <Image
              src={annuleIcon}
              width={90}
              height={90}
              alt="logo-annulation"
            />
          </button>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            data-cy="validateBtn"
          >
            <Image
              src={valideIcon}
              width={90}
              height={90}
              alt="logo-validation"
            />
          </button>
        </div>
        <div className={style.messageContainer}>
          nota :<div className={style.messageInfo}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default ValidateDelete;
