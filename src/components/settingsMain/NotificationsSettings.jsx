import React, { useState, useEffect } from 'react';
import { IoIosNotificationsOff, IoIosNotificationsOutline, IoIosNotifications, IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/NotificationS.css";

const Notifications = ({ onClose }) => {
  const [option, setOption] = useState('Nothing');
  const [notification, setNotification] = useState(localStorage.getItem('notification') || '');

  const handleOptionClick = (newOption) => {
    setOption(newOption);
  };

  const handleSave = () => {
    const selectedIcon = option === 'Mute' ? 'IoIosNotificationsOff' : 'IoIosNotifications';
    localStorage.setItem('notification', selectedIcon);
    toast.success("Concluded", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      theme: "colored"
    });
  };

  useEffect(() => {
    const storedNotification = localStorage.getItem('notification');
    setNotification(storedNotification || 'IoIosNotificationsOff');
    setOption(storedNotification === 'IoIosNotificationsOff' ? 'Mute' : 'Normal');
  }, []);

  return (
    <div className="infoPanelContainer">
      <div className="infoPanel">
        <h2>Notifications</h2>
        <p onClick={() => handleOptionClick('Mute')} className="notificationContainer">
          {option === 'Mute' ? <IoIosNotificationsOff className="notificationIco" /> : <IoIosNotificationsOutline className="notificationIco" />}
          {' '}
          Mute {option === 'Mute' && <span role="img" aria-label="selected">✓</span>}
        </p>
        <p onClick={() => handleOptionClick('Normal')} className="notificationContainer">
          {option === 'Normal' ? <IoIosNotifications className="notificationIco" /> : <IoIosNotificationsOutline className="notificationIco" />}
          {' '}
          Normal {option === 'Normal' && <span role="img" aria-label="selected">✓</span>}
        </p>
        <button onClick={handleSave} className="saveBtn">Save</button>
        <button className="returnBtn" onClick={onClose}><IoMdArrowRoundBack /></button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notifications;