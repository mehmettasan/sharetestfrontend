import React, { useEffect, useState } from "react";
import styles from "./TestResultPage.module.css";
import { sessionAtom, redirectTestIDAtom } from "../../../store/JotaiStore";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

const TestResultPage = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [redirect, setRedirect] = useAtom(redirectTestIDAtom);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const getResults = async () => {
    try {
      const { data } = await axios.post("/test/gettestresult", {
        testID: redirect,
        userID: session,
      });
      setAnswers(data);
    } catch (error) {
    }
  };

  const goHome = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!redirect) {
      navigate("/dashboard");
    }
    getResults();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title1}>Tebrikler! Testi Tamamladınız.</h1>
        <div className={styles.resultContainer}>
          <h1 className={styles.title2}>Sonuçlar</h1>
          <div className={styles.correctItem}>
            Doğru: {answers.correctCount}
          </div>
          <div className={styles.wrongItem}>Yanlış: {answers.wrongCount}</div>
          <div className={styles.blankItem}>Boş: {answers.blankCount}</div>
        </div>
        <div className={styles.btnContainer}>
          <Button onClick={goHome} className={styles.nextBtn}>
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
