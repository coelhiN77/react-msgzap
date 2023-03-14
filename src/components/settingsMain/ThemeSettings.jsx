import { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/SettingsS.css";

const ThemeSettings = ({ onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState('#fff');
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('chatTheme') || 'system');

  const themeClickBtn = () => {
    if (selectedTheme === 'system') {
      localStorage.removeItem('chatTheme');
    } else {
      localStorage.setItem('chatTheme', selectedTheme);
    }
    setCurrentTheme(selectedTheme);

    const container = document.querySelector('.chatContainer');
    const contact = document.querySelector('.chatContact');
    const times = document.querySelectorAll('.messageTime');
    const receivedMessages = document.querySelectorAll('.chatMessageC .received p');

    if (selectedTheme === '#fff') {
      container.style.backgroundColor = '#fff';
      contact.style.backgroundColor = '#fff';
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      receivedMessages.forEach(msg => {
        msg.style.background = '#282c34';
        msg.style.color = '#fff';
      });
      times.forEach(time => {
        time.style.color = '#111';
      });
    } else {
      container.style.backgroundColor = '#282c34';
      contact.style.backgroundColor = '#282c34';
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      receivedMessages.forEach(msg => {
        msg.style.background = '#e5e5ea';
        msg.style.color = 'black';
      });
      times.forEach(time => {
        time.style.color = '#fff';
      });
    }
    toast.success("Concluded", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      theme: "colored"
    });
  };

  return (
    <div className="infoPanelContainer">
      <div className="infoPanel">
        <div className="themeBody">
          <h2>Theme</h2>
          <div className="themeOption">
            <div className="themeOptionInner">
              <input
                type="radio"
                id="theme-light"
                name="theme"
                value="#fff"
                checked={selectedTheme === '#fff'}
                onChange={(e) => setSelectedTheme(e.target.value)}
              />
            </div>
            <label className="themeName">Light</label>
          </div>

          <div className="themeOption">
            <div className="themeOptionInner">
              <input
                type="radio"
                id="theme-dark"
                name="theme"
                value="#282c34"
                checked={selectedTheme === '#282c34'}
                onChange={(e) => setSelectedTheme(e.target.value)}
              />
            </div>
            <label className="themeName">Dark</label>
          </div>

          <div className="themeOption">
            <div className="themeOptionInner">
              <input
                type="radio"
                id="theme-system"
                name="theme"
                value="system"
                checked={selectedTheme === 'system'}
                onChange={(e) => setSelectedTheme(e.target.value)}
              />
            </div>
            <label className="themeName">System Default</label>
          </div>

          <button className="themeBtn" onClick={themeClickBtn}>Save</button>
          <button className="returnBtn" onClick={onClose}><IoMdArrowRoundBack /></button>
        </div>

      </div>
      <div className="chatContainer">
        <div className="chatContact"></div>
      </div>
      <div className="messageContainer"></div>
      <ToastContainer />
    </div>
  );
};

export default ThemeSettings;