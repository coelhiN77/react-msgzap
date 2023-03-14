import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, databaseApp } from "../../utils/firebaseConfig";
import { Link } from "react-router-dom";
import { SiWechat } from "react-icons/si";
import { ImExit } from "react-icons/im";
import { FiInfo, FiSettings } from 'react-icons/fi';
import InfoPanel from './../layout/InfoPanel';
import ChatMessage from "./ChatMessage";
import InfoSettings from './../layout/InfoSettings';
import "../styles/ChatsS.css";

const ChatRoom = (props) => {
  const textInput = useRef(null);
  const dummy = useRef();
  const sendButton = useRef();
  const messagesRef = collection(databaseApp, "messages");
  const q = query(messagesRef, orderBy("createdAt"));
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [messages] = useCollectionData(q, { idField: "id" });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    document.title = "MsgZap - Chat (1)";

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    sendButton.current.addEventListener("click", () => {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    const { photoURL, uid } = currentUser;

    const regex = /(https?:\/\/[^\s]+)/gi;
    if (formValue.match(regex)) {
      alert('It is not allowed to send links or images.');
      return;
    };

    const messageText = `${formValue}`;
    try {
      await addDoc(messagesRef, {
        text: formValue,
        uid,
        photoURL,
        createdAt: serverTimestamp(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
      });
      setFormValue('');


      setTimeout(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handlePanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }


  return (
    <>
      <FiInfo className="infoIcon" onClick={handlePanelToggle} />
      {isPanelOpen && <InfoPanel onClose={handlePanelToggle} />}
      <div className="chatContainer">
        <div className="chatContact">
          <nav className="chatTitle">
            <h2>MsgZap</h2> <SiWechat className="titleContainer" />
            <div className="watchContainer">
              <span>{currentTime}</span>
              <FiSettings className="exitBtn" onClick={handleSettingsToggle} />
              {isSettingsOpen && <InfoSettings onClose={handleSettingsToggle} />}

              <Link to="/" className="exitBtn"> <ImExit /> </Link>
            </div>
          </nav>
          <div className="chatBody">
            <main>
              {messages && messages.map((message) => (
                <ChatMessage key={message.id} message={message} auth={auth} />
              ))}
              <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Type something..."
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                ref={textInput}
              />

              <button
                type="submit"
                disabled={!formValue}
                ref={sendButton}
              >Send</button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;