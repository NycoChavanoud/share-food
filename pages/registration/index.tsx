import type { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import Layout from "../../components/Layout";
import RegisterForm from "../../components/RegisterForm";
import style from "../../styles/Registration.module.css";

const Registration: NextPage = () => {
  return (
    <Layout pageTitle="S'inscrire">
      <div className={style.titleContainer}>
        <div className={style.bckBtnContainer}>
          {" "}
          <BackBtn />
        </div>
        <h1 className={style.titleRegister}>Créer son compte</h1>
      </div>
      <RegisterForm />
    </Layout>
  );
};

export default Registration;
