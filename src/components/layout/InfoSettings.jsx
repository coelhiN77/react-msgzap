import React, { useState } from 'react';
import { MdCircleNotifications } from "react-icons/md";
import { TfiDesktop } from 'react-icons/tfi';
import { CgProfile } from "react-icons/cg";
import { BsImage } from "react-icons/bs";
import ThemeSettings from '../settingsMain/ThemeSettings';
import ProfileSettings from '../settingsMain/ProfileSettings';
import NotificationsSettings from '../settingsMain/NotificationsSettings';
import WallpaperSettings from "../settingsMain/WallpaperSettings";
import "../styles/InfoS.css";

const InfoSettings = ({ onClose }) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWallpaperOpen, setIsWallpaperOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleToggle = (toggleFunction) => {
    toggleFunction(prevState => !prevState);
  }

  return (
    <div className="infoPanelContainer">
      <div className="infoPanel">
        <h2>Settings</h2>

        <div className="settingClick" onClick={() => handleToggle(setIsThemeOpen)}>
          <h3> <TfiDesktop className="settingIcon" /> Theme</h3>
        </div>

        <div className="settingClick" onClick={() => handleToggle(setIsProfileOpen)}>
          <h3> <CgProfile className="settingIcon" /> Profile</h3>
        </div>

        <div className="settingClick" onClick={() => handleToggle(setIsWallpaperOpen)}>
          <h3> <BsImage className="settingIcon" /> Chat Wallpaper</h3>
        </div>

        <div className="settingClick" onClick={() => handleToggle(setIsNotificationOpen)}>
          <h3> <MdCircleNotifications className="settingIcon" /> Notifications</h3>
        </div>

        {isThemeOpen && <ThemeSettings onClose={() => handleToggle(setIsThemeOpen)} />}
        {isProfileOpen && <ProfileSettings onClose={() => handleToggle(setIsProfileOpen)} />}
        {isWallpaperOpen && <WallpaperSettings onClose={() => handleToggle(setIsWallpaperOpen)} />}
        {isNotificationOpen && <NotificationsSettings onClose={() => handleToggle(setIsNotificationOpen)} />}

        <button className="closeBtn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default InfoSettings;