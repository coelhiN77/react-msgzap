import { FaHeart } from 'react-icons/fa';
import styles from "../styles/FooterS.module.css";

const Footer = () => {
  return (
    <footer>
      <p className="footerContainer">Created with <FaHeart className={styles.social_list} /> by <span className={styles.span2}>coelhiN</span><span className={styles.span}>Code</span> - &copy; 2023
      </p>
    </footer>
  )
}

export default Footer