import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import Wip from "../../components/Wip";

const Event: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos évènements">
      <BackBtn />
      <h1>Event Page</h1>
      <Wip />
    </LayoutCurrentUser>
  );
};

export default Event;
