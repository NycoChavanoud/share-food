import Image from "next/image";
import Router from "next/router";
import Arrow from "../public/icons/backArrow.png"




const BackBtn = () => {
    return (

        <button
            data-cy='backBtn'
            style={{
                backgroundColor: 'transparent',
                border: 'none'
            }} onClick={() => { Router.back() }}>
            <Image src={Arrow} width={35} height={35} alt="logo-flèche" />
        </button>


    )
}


export default BackBtn
