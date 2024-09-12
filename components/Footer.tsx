import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <>
      <div className="m-10">
        <div>Thanks for start playing!</div>
        <Link className="" href={"https://github.com/Nihongo-Jouzu/nihongo-jouzu-frontend"}>Our repo Link for frontend</Link><br></br>
        <Link href={"https://github.com/Nihongo-Jouzu/nihongo-jouzu-backend"}>Our repo Link for backend</Link>
      </div>
    </>
  );
};

export default Footer;
