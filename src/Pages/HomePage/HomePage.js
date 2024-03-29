import React from "react";

import styles from "./HomePage.module.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>SHARE TEST</h1>
        </div>
        <div>
          <Link to={"/login"}>
            <Button type="default" className={styles.loginButton}>
              Giriş Yap
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button type="default" className={styles.loginButton}>
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <div>
            <div className={styles.type1}>Hemen Başlayın</div>
            <div className={styles.type2}>
              Saniyeler İçerisinde Testinizi Oluşturun ve Topluluğunuz ile
              paylaşın.
            </div>
          </div>
          <Link to={"/register"}>
            <Button className={styles.joinButton}>Hemen Kayıt ol</Button>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={require("../../assets/images/Design.webp")}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
