import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import BackBtn from "../../components/BackBtn";
import RegisterForm from "../../components/RegisterForm";

import style from "../../styles/Registration.module.css";

const Registration: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>S&apos;inscrire</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <div className={style.titleContainer}>
        <BackBtn />
        <h1 className={style.titleRegister}>Créer son compte</h1>
      </div>
      <RegisterForm />
    </>
  );
};

export default Registration;
