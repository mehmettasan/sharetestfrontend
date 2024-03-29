import React, { useEffect } from "react";

import styles from "./ExitPage.module.css";
import { Button } from "antd";
import { useAtom } from "jotai";
import { sessionAtom, activeMenuAtom } from "../../../store/JotaiStore";
import { Link } from "react-router-dom";

const ExitPage = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);

  const handleExit = () => {
    setSession(null);
  };

  useEffect(() => {
    setActiveMenu("exit");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.exitText}>
          Çıkış yapmak istediğinize emin misiniz?
        </div>
        <div className={styles.btnContainer}>
          <Link to={"/dashboard"}>
            <Button className={styles.cancelBtn}>Ana Menü</Button>
          </Link>
          <Button className={styles.exitBtn} onClick={handleExit}>
            Onayla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExitPage;
