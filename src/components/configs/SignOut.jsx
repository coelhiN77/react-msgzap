import { auth } from "../../utils/firebaseConfig";

const SignOut = () => {
  return (
    auth.currentUser && <button className="signOutBtn" onClick={() => auth.signOut()}>Exit</button>
  );
};

export default SignOut;