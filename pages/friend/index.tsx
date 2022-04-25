import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const Friend: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="Vos amis">
      <BackBtn />
    </LayoutCurrentUser>
  );
};

export default Friend;
