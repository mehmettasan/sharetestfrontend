import React, { useEffect, useState } from "react";

import useDigitInput from "react-digit-input";
import styles from "./DHomePage.module.css";
import { Button } from "antd";
import { useAtom } from "jotai";
import { activeMenuAtom } from "../../../store/JotaiStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DHomePage = () => {
  const [value, onChange] = React.useState("");
  const [activeMenu,setActiveMenu]=useAtom(activeMenuAtom)
  const navigate=useNavigate()
  const digits = useDigitInput({
    acceptedCharacters: /^[a-zA-Z0-9]*$/,
    length: 6,
    value,
    onChange,
  });

  const loginTest =()=>{
    if (value.length==6) {
      navigate("/startTest/"+value)
    }
  }

  useEffect(()=>{
    setActiveMenu("home")
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.createContainer}>
        <div className={styles.hpSection}>
        <div className={styles.type2}>Bir Test Oluşturun</div>
        <div className={styles.type1}>
          Hemen kendi testinizi oluşturun ve topluluğunuz ile paylaşın...
        </div>
        <Link to={"/dashboard/createtest"}>
        <Button className={styles.joinButton}>Test Oluştur</Button>
        </Link>
        </div>
      </div>

      <div className={styles.joinContainer}>
        <div className={styles.hpSection}>
          <div className={styles.type2}>Bir Teste Katılın</div>
          <div className={styles.type1}>6 Haneli Test Kodunuzu Giriniz.</div>
          <div className={styles.digitGroup}>
            <input
              className={styles.digitElement}
              inputMode="decimal"
              {...digits[0]}
            />
            <input
              className={styles.digitElement}
              inputMode="decimal"
              {...digits[1]}
            />
            <input
              className={styles.digitElement}
              inputMode="decimal"
              {...digits[2]}
            />
            <input
              className={styles.digitElement}
              inputMode="decimal"
              {...digits[3]}
            />
            <input
              className={styles.digitElement}
              inputMode="decimal"
              {...digits[4]}
            />
            <input
              className={styles.digitElement}
              inputMode="decimal"
              {...digits[5]}
            />
          </div>
          <Button onClick={loginTest} className={styles.joinButton}>Teste Katıl</Button>
        </div>
      </div>
    </div>
  );
};

export default DHomePage;
