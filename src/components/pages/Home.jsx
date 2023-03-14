import { getAuth } from "firebase/auth";
import { app } from "../../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import SignIn from "../configs/SignIn";
import Footer from '../layout/Footer';
import "../styles/AppS.css";

const auth = getAuth(app);

const Home = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.title = "MsgZap";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="AppContainer">
        <div className="contact_box">
          <div className="panel_box">
            <header>
              <h1>Welcome to <span>MsgZap💬</span></h1>
            </header>
            <section>{<SignIn />}</section>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;