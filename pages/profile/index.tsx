import type { NextPage } from "next";
import LayoutCurrentUser from "../../components/LayoutCurrentUser";

const index: NextPage = (props) => {
  return (
    <LayoutCurrentUser pageTitle="détail du profil">
      <div> profil</div>
    </LayoutCurrentUser>
  );
};
export default index;
