import type { NextPage } from "next";
import { useState } from "react";
import PublicHeader from "../../components/PublicHeader";
import RegisterBtn from "../../components/RegisterBtn";
import style from "../../styles/Login.module.css"
import Head from 'next/head'


const Login: NextPage = (props) => {

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(mail, password)
    setMail('')
    setPassword('')
  }



  return (
    <>
      <Head>
        <title>Identification</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <PublicHeader title="S’identifier" link="/" />

      <form onSubmit={handleSubmit} className={style.formLogin} data-cy="formLogin" >
        <label htmlFor="email" className={style.labelForm} >votre email :</label>
        <input type="email" id="email" data-cy='email' className={style.inputForm} autoComplete="off" value={mail} onChange={(e) => setMail(e.target.value)} required />
        <label htmlFor="password" className={style.labelForm} >mot de passe :</label>
        <input type="password" id="password" data-cy="password" autoComplete="off" className={style.inputForm} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className={style.btnForm} >Valider</button>
      </form>

      <RegisterBtn content="S’inscrire" link="/registration" />
    </>
  );
};

export default Login;
