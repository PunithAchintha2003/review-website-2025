import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      className="border-t"
    >
      <div className="container mx-auto p-2 text-center">
        <p>© 2024 GreenGrass. All rights reserved.</p>

        {/* <div className="flex items-center gap-4 justify-center text-2xl">
                <a href="" className="hover:text-green-400">
                    <FaFacebook/>
                </a>
                <a href="" className="hover:text-green-400">
                    <FaInstagram/>
                </a>
                <a href="" className="hover:text-green-400">
                    <FaLinkedin/>
                </a>
            </div> */}
      </div>
    </footer>
  );
};

export default Footer;