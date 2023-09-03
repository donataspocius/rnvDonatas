import NextImage from "next/image";

import creditCards from "../../../assets/web_images/reflixLogo.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Get Your Popcorns Ready. Copyright © 2023</p>
      {/* <NextImage src={creditCards} alt="credit card logos" /> */}
    </div>
  );
};

export default Footer;
