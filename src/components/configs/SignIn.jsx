import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import '../styles/SignInS.css';

const auth = getAuth(app);

const SignIn = () => {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const [acceptedCookies, setAcceptedCookies] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = document.cookie.includes('acceptedCookies=true');
    setAcceptedCookies(hasAcceptedCookies === false || hasAcceptedCookies === 'false' ? false : true);
  }, []);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider).then(() => {
      navigate('/chatroom');
    });
  };

  const handleAcceptCookies = () => {
    document.cookie = 'acceptedCookies=true; max-age=31536000';
    setAcceptedCookies(true);
    console.log("✔")
  };

  return (
    <>
      {!acceptedCookies && (
        <div className="cookieBanner">
          <p>We use cookies to provide a better user experience. By using this website, you agree to our use of cookies.</p>
          <button className="cookieBtn" onClick={handleAcceptCookies}>Accept</button>
        </div>
      )}
      {acceptedCookies && (
        <button className="signInBtn" onClick={handleSignIn}>
          Login with Google
        </button>
      )}
    </>
  );
};

export default SignIn;