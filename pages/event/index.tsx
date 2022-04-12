import { NextPage } from "next";
import BackBtn from "../../components/BackBtn";
import Layout from "../../components/Layout";

const Event: NextPage = (props) => {
  return (
    <Layout pageTitle="Vos évènements">
      <BackBtn />

      <h1>Event Page</h1>
    </Layout>
  );
};

export default Event;
