import Image from "next/image";
import Link from "next/link";
import Arrow from "../public/icons/backArrow.png"




const BackBtn = ({ url }: any) => {
    return (
        <Link passHref href={url} >
            <Image src={Arrow} alt="logo-flèche" />
        </Link>

    )
}


export default BackBtn
