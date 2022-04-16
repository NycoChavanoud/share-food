import Image from "next/image";

import top from "../public/icons/top.png";

const TopBtn = ({ scrollFunction }: any) => {
  return (
    <button
      data-cy="topBtn"
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        position: "fixed",
        bottom: "40px",
        right: "10px",
        zIndex: "99",
      }}
      onClick={scrollFunction}
    >
      <Image src={top} width={40} height={40} alt="logo-flèche" />
    </button>
  );
};

export default TopBtn;
