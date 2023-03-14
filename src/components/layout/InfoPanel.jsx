import { FiGithub } from "react-icons/fi";
import logoPhoto from "../styles/img/logoPhoto.jpg";
import "../styles/InfoS.css";

const InfoPanel = ({ onClose }) => {
  return (
    <div className="infoPanelContainer">
      <div className="infoPanel">
        <h2>MsgZap</h2>
        <img src={logoPhoto} alt="coelhiNPhoto" className="infoImage" />
        <h3>MsgZap is a chat where you can chat with your friends in real time, make friends and have fun with jokes, stories and daily conversations. Design made by coelhiN77.</h3>
        <div className="infoBtn">
          <a href="https://github.com/coelhiN77" target="_blank">
            <FiGithub className="btnInfo" />
          </a>
        </div>

        <button className="closeBtn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default InfoPanel;