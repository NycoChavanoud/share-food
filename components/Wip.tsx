import Image from "next/image";

const Wip = () => {
  return (
    <>
      <div
        className="wipContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          margin: "40px auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Page en construction</h2>
        <p style={{ marginBottom: "15px", fontSize: "1.5em" }}>
          Notre équipe travail pour enrichir votre application
        </p>
        <img src="https://www.gifgratis.net/gifs_animes/travaux_en_cours/69.gif" />
      </div>
    </>
  );
};

export default Wip;
