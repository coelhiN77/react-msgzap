import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ChatRoom from "./components/pages/ChatRoom";
import ThemeSettings from './components/settingsMain/ThemeSettings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/themeSettings" element={<ThemeSettings />} />
      </Routes>
    </Router>
  );
};

export default App;