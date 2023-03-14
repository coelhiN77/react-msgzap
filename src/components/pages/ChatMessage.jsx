import { auth } from '../../utils/firebaseConfig';
import '../styles/ChatsS.css';

const ChatMessage = (props) => {
  const { id, text, uid, photoURL, createdAt } = props.message;

  const createDefaultProfileImage = (displayName) => {
    const initials = displayName ? displayName.match(/\b\w/g) || [] : [];
    const defaultProfileImage = `https://ui-avatars.com/api/?name=${initials.join('')}&background=random&color=fff`;
    return defaultProfileImage;
  };

  const profileImage = photoURL ? photoURL : createDefaultProfileImage(auth.currentUser.displayName);

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div key={id} className="chatMessageC">
      <div className={`message ${messageClass}`}>
        <div className="messageContainer">
          <span className="messageTime">
            {createdAt && new Date(createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}
          </span>
        </div>
        <div className="PhotoContainer">
          <img src={profileImage} alt="photo" className="messagePhoto" referrerPolicy="no-referrer" />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;