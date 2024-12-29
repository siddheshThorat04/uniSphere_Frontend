import React from "react";
import chatHomeLogo from "../../assets/chatHomeLogo.png";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { useDarkThemeContext } from "../../contextApi/DarkTheme";

const HomeDesktop = ({ setIsTermsModal }) => {
  const {isDark}=useDarkThemeContext()
    const navigate = useNavigate()
    const navigateToChat = () => {
        navigate("/chat")
    }
  return (
    <div className="firstStep">
      <button className="HomeButton"   ><GoHome onClick={() => navigate("/")  } className={isDark==="false"?'text-black':'text-white'}     /></button>
      <h1 className={isDark==="false"?"heading text-black":"heading text-white"}  >
          mateBatu: find someone to chat with
      </h1>
      <div>
        <img src={chatHomeLogo}  alt="" />
      </div>

      <button
        onClick={navigateToChat }
        className="startButtonHome text-white  "
      >
        Start Talking
      </button>
    </div>
  );
};

export default HomeDesktop;
