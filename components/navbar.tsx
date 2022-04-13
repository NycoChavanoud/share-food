import style from "./styleComponents/Navbar.module.css";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import home from "../public/icons/home.png";
import calendar from "../public/icons/calendar.png";
import crew from "../public/icons/crew.png";
import friend from "../public/icons/friend.png";
import signoutIcon from "../public/icons/signout.png";

const Navbar = () => {
  return (
    <>
      <div className={style.navbarContainer}>
        <button
          className={style.btnIcons}
          onClick={() => {
            Router.push("/dashboard");
          }}
          cy-data="logoHome"
        >
          {" "}
          <Image src={home} width={35} height={35} alt="logo-home" />{" "}
        </button>
        <button
          className={style.btnIcons}
          onClick={() => {
            Router.push("/event");
          }}
          cy-data="logoEvent"
        >
          {" "}
          <Image
            src={calendar}
            width={35}
            height={35}
            alt="logo-calendar"
          />{" "}
        </button>
        <button
          className={style.btnIcons}
          onClick={() => {
            Router.push("/crew");
          }}
          cy-data="logoCrew"
        >
          {" "}
          <Image src={crew} width={35} height={35} alt="logo-crew" />{" "}
        </button>
        <button
          className={style.btnIcons}
          onClick={() => {
            Router.push("/friend");
          }}
          cy-data="logoFriend"
        >
          {" "}
          <Image src={friend} width={35} height={35} alt="logo-friend" />{" "}
        </button>
        <button
          className={style.btnIcons}
          onClick={() => {
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            });
          }}
          cy-data="logoLogOut"
        >
          {" "}
          <Image
            src={signoutIcon}
            width={35}
            height={35}
            alt="logo-signout"
          />{" "}
        </button>
      </div>
    </>
  );
};

export default Navbar;
