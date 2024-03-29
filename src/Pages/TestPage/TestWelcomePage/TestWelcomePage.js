import React, { useEffect, useState } from "react";

import styles from "./TestWelcomePage.module.css";
import { useParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { sessionAtom,TestAtom } from "../../../store/JotaiStore";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

const TestWelcomePage = () => {
  const { testCode } = useParams();
  const navigate = useNavigate();
  const session = useAtomValue(sessionAtom);
  const [test,setTest] = useState({})
  const [quizTest,setQuizTest]=useAtom(TestAtom)

  const loadingTest = async()=>{
    try {
        const {data}= await axios.post("/test/logintest",{
            userID:session,
            loginCode:testCode
        })
        console.log(data)
        console.log(data.test)
        setTest(data.test)
    } catch (error) {
       navigate("/dashboard")
    }
  }

  const StartTest =()=>{
    setQuizTest(test)
    navigate("/answerTest")
  }

  useEffect(()=>{
    loadingTest()
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.contentContaniner}>
        <div className={styles.title1}>{test?.testName}</div>
        <div className={styles.infoContainer}>
          <div className={styles.infoText}>Soru sayısı: {test?.questions?.length}</div>
          <div className={styles.infoText}>Soru Başına Süre: {test?.time} saniye</div>
        </div>
        <div className={styles.descContainer}>
          <div className={styles.title2}>Test Açıklaması:</div>
          {test?.description}
        </div>
        <div className={styles.buttonContainer}>
            <Button onClick={StartTest} className={styles.startBtn}>
                Teste Başla
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TestWelcomePage;
