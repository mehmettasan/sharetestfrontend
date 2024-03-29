import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../../../store/JotaiStore";
import styles from "./TestDetailPage.module.css";
import { Button } from "antd";

const TestDetailPage = () => {
  const [testDetail, setTestDetail] = useState({});
  const session = useAtomValue(sessionAtom);
  const [message,setMessage]=useState("")
  const [isClosed,setIsClosed]=useState(false)

  let { testId } = useParams();

  const handleCloseTest= async()=>{
    try {
      const {data} = await axios.post("/test/getCloseTest",{testID:testId})
      setMessage(data?.message)
      setIsClosed(true)
    } catch (error) {
      console.log(error)
    }
  }

  const getDetails = async () => {
    const { data } = await axios.post("/test/getusersonetest", {
      userId: session,
      testId: testId,
    });
    setTestDetail(data.test);
    setIsClosed(data.test.isClosed)
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title1}>{testDetail.testName}</p>
      </div>
      <div className={styles.statusBarContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.statusSeciton}>DURUM:</div>
          <div className={styles.statusSeciton}>
            {isClosed ? "KAPALI" : "AKTİF"}
          </div>
        </div>
        <div className={styles.statusContainer}>
          <div className={styles.statusSeciton}>Giriş Kodu:</div>
          <div className={styles.statusSeciton}>{isClosed? "0" : testDetail.code}</div>
        </div>
        {!isClosed && 
        <Button type="primary" danger className={styles.btnContainer} onClick={handleCloseTest} >
          TESTİ KAPAT
        </Button>
        }
      </div>

      <div className={styles.descriptionContainer}>
        <div className={styles.title2}>Test Açıklaması</div>
        <div>{testDetail.description}</div>
      </div>

      <div className={styles.questionsContainer}>
        <div className={styles.title3}>Sorular</div>
        {testDetail.questions?.map((question) => {
          return (
            <div className={styles.questionContainer}>
              <div className={styles.question}>{question.question}</div>
              <div className={styles.questionSection}>
                <div
                  className={styles.answer}
                  style={{
                    backgroundColor:
                      question.trueAnswer == "a" ? "green" : "red",
                  }}
                >
                  {question.optionA}
                </div>
                <div
                  className={styles.answer}
                  style={{
                    backgroundColor:
                      question.trueAnswer == "b" ? "green" : "red",
                  }}
                >
                  {question.optionB}
                </div>
              </div>
              <div className={styles.questionSection}>
                <div
                  className={styles.answer}
                  style={{
                    backgroundColor:
                      question.trueAnswer == "c" ? "green" : "red",
                  }}
                >
                  {question.optionC}
                </div>
                <div
                  className={styles.answer}
                  style={{
                    backgroundColor:
                      question.trueAnswer == "d" ? "green" : "red",
                  }}
                >
                  {question.optionD}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestDetailPage;
