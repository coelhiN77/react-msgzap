import React, { useState, useEffect } from 'react';
import { auth } from '../../utils/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io"
import { FaUser } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/ProfileS.css";

const ProfileSettings = ({ onClose }) => {
  const profileImage = auth.currentUser.photoURL ? auth.currentUser.photoURL : 'https://ui-avatars.com/api/?name=No+photo&background=random&color=fff';
  const displayName = auth.currentUser.displayName || 'User';

  const [status, setStatus] = useState(localStorage.getItem('status') || 'Online');
  const [about, setAbout] = useState(localStorage.getItem('about') || '');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    localStorage.setItem('status', event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleAboutKeyDown = (event) => {
    if (event.keyCode === 13) {
      localStorage.setItem('about', event.target.value);
    }
  };

  const handleSave = () => {
    localStorage.setItem('about', about);
    toast.success("Concluded", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      theme: "colored"
    });
  };

  useEffect(() => {
    setAbout(localStorage.getItem('about') || '');
  }, []);

  return (
    <div className="infoPanelContainer">
      <div className="infoPanel">
        <h2>Profile</h2>
        <div className="profileContainer">
          <img src={profileImage} alt="userPhoto" className="profilePhoto" />
          <div className="profileStatus">
            <select value={status} onChange={handleStatusChange}>
              <option value="Online">🟢 Online</option>
              <option value="Idle">🟡 Idle</option>
              <option value="Busy">🔴 Busy</option>
              <option value="Offline">⚪ Offline</option>
            </select>
          </div>
          <p><FaUser className="userIco" /> {displayName}</p>

          <div className="profileAbout">
            <label>About <BsFillPencilFill className="profileIco" /></label>
            <textarea
              type="textArea"
              className="profileArea"
              rows="4"
              cols="50"
              value={about}
              onChange={handleAboutChange}
              onKeyDown={handleAboutKeyDown}
            />
            <button onClick={handleSave} className="saveBtn">Save</button>
          </div>
        </div>

        <button className="returnBtn" onClick={onClose}><IoMdArrowRoundBack /></button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;