import axios from "axios";
import style from "./styleComponents/ValidateDelete.module.css";
// import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import valideIcon from "../public/icons/valide.png";
import annuleIcon from "../public/icons/annule.png";
import Image from "next/image";

type validateDeleteProps = {
  id: any;
  deleteContainer: any;
  setDeleteContainer: any;
  notifySuccess: any;
  type: string;
  message: string;
};

const ValidateDelete = ({
  id,
  deleteContainer,
  setDeleteContainer,
  notifySuccess,
  type,
  message,
}: validateDeleteProps) => {
  const router = useRouter();

  const handleConfirm = () => {
    if (id) {
      axios
        .delete(`/api/event/${id}`)
        .then(() => router.push("/event"))
        .then(() => notifySuccess("Evènement supprimé avec succès"))
        .then(() => {
          setDeleteContainer(!deleteContainer);
        })
        .catch((err) => console.log(err.response.status));
    }
  };

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
            onClick={handleConfirm}
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
