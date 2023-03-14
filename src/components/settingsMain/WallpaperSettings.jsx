import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/WallpaperS.css';

const WallpaperSettings = ({ onClose }) => {
  const defaultColor = '#282c34';
  const [previewColor, setPreviewColor] = useState();
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem('chatColor') || 'default'
  );

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSave = () => {
    if (selectedColor === 'default') {
      localStorage.removeItem('chatColor');
      setSelectedColor(defaultColor);
      setPreviewColor(defaultColor);
    } else {
      const storedColor = localStorage.getItem('chatColor');
      if (storedColor !== selectedColor) {
        localStorage.setItem('chatColor', selectedColor);
      }
      setPreviewColor(selectedColor);
      document.querySelector('.chatContact').style.backgroundColor = selectedColor;
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
        <h2>Chat Wallpaper</h2>
        <div className="wallpaperContainer">
          <p>Select a color for your chat:</p>
          <select value={selectedColor} onChange={handleColorChange}>
            <option value="default">⚫ Default</option>
            <option value="#e49400">🟤 Orange</option>
            <option value="#c5c557">🟡 Yellow</option>
            <option value="green">🟢 Green</option>
            <option value="red">🔴 Red</option>
            <option value="blue">🔵 Blue</option>
            <option value="purple">🟣 Purple</option>
          </select>
          <button className="saveBtn" onClick={handleSave}>Save</button>
        </div>
        <button className="returnBtn" onClick={onClose}>
          <IoMdArrowRoundBack />
        </button>
        <div className="chatContact"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WallpaperSettings;