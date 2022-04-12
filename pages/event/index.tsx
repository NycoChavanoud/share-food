import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const Event: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos évènements">
      <BackBtn />

      <h1>Event Page</h1>
    </LayoutCurrentUser>
  );
};

export default Event;
