import type { NextPage } from "next";
import Head from 'next/head'
import BackBtn from "../../components/BackBtn";
import style from "../../styles/Registration.module.css"



const Registration: NextPage = (props) => {

    return (
        <>
            <Head>
                <title>S&apos;inscrire</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            </Head>

            <div className={style.titleContainer}>
                <BackBtn />
                <h1 className={style.titleRegister}>Créer son compte</h1>
            </div>

            <div className={style.workInProgress}>
                <p className={style.wipP}>Un peu de patience...</p>
                <p className={style.wipP}> ...... EN CONSTRUCTION ...... </p>
                <p className={style.wipP}>👷‍♂️👷🏽👷🏿‍♀️🔨🏗🏗🚧👷🏽⚠️⚠️⚠️⚠️⚠️⚠️</p>
            </div>
        </>
    );
};

export default Registration;
