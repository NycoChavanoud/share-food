import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";
import Wip from "../../components/Wip";

const Friend: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos amis">
      <BackBtn />
      <h1>Friend Page</h1>
      <Wip />
    </LayoutCurrentUser>
  );
};

export default Friend;