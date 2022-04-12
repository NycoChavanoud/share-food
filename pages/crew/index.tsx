import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import Layout from "../../components/Layout";

const Crew: NextPage = (props) => {
  return (
    <Layout pageTitle="Vos groupes">
      <BackBtn />

      <h1>Crew Page</h1>
    </Layout>
  );
};

export default Crew;
