const Wip = () => {
  return (
    <>
      <div
        className="wipContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          margin: "40px auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            marginBottom: "15px",
            textAlign: "center",
            fontSize: "1.4em",
          }}
        >
          Page en construction
        </p>

        <img src="https://www.gifgratis.net/gifs_animes/travaux_en_cours/69.gif" />
        <p
          style={{
            marginTop: "25px",
            fontSize: "1em",
            textAlign: "center",
          }}
        >
          Notre équipe travail pour enrichir votre application
        </p>
      </div>
    </>
  );
};

export default Wip;
