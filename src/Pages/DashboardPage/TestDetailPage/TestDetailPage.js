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
  const [message, setMessage] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [users, setUsers] = useState([]);

  let { testId } = useParams();

  const handleCloseTest = async () => {
    try {
      const { data } = await axios.post("/test/getCloseTest", {
        testID: testId,
      });
      setMessage(data?.message);
      setIsClosed(true);
    } catch (error) {}
  };

  const getDetails = async () => {
    try {
      const { data } = await axios.post("/test/getusersonetest", {
        userId: session,
        testId: testId,
      });
      setTestDetail(data.test);
      setIsClosed(data.test.isClosed);
    } catch (error) {}
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.post("/test/getAllUsersTestResponses", {
        testID: testId,
      });
      setUsers(data);
    } catch (error) {}
  };

  const calculateAnswers = (answers) => {
    let truecount = 0;
    let wrongCount = 0;
    let blankCount = 0;

    answers.map((item) => {
      if (item.Answer == "e") {
        blankCount++;
      } else {
        if (item.Result) {
          truecount++;
        } else {
          wrongCount++;
        }
      }
    });

    return { truecount, wrongCount, blankCount };
  };

  useEffect(() => {
    getDetails();
    getUsers();
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
          <div className={styles.statusSeciton}>
            {isClosed ? "0" : testDetail.code}
          </div>
        </div>
        {!isClosed && (
          <Button
            type="primary"
            danger
            className={styles.btnContainer}
            onClick={handleCloseTest}
          >
            TESTİ KAPAT
          </Button>
        )}
      </div>

      <div className={styles.descriptionContainer}>
        <div className={styles.title2}>Test Açıklaması</div>
        <div>{testDetail.description}</div>
      </div>

      <div className={styles.questionsContainer}>
        <div className={styles.title3}>Sorular</div>
        {testDetail.questions?.map((question) => {
          return (
            <div key={question._id} className={styles.questionContainer}>
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
      <div className={styles.usersContainer}>
        <div className={styles.title4}>Kullanıcılar</div>
        {users.map((item) => {
          let user = item.Answers[0]
          const counts = calculateAnswers(user.AnswerList)
          return (
            <div className={styles.userDetailContainer} key={user.UserID}>
              <div>{user.Name}</div>
              <div>
                <div style={{color:"#089404"}}>Doğru: {counts.truecount}</div>
                <div style={{color:"#8B0000"}}>Yanlış: {counts.wrongCount}</div>
                <div style={{color:"#9ECAEF"}}>Boş: {counts.blankCount}</div>
              </div>
              <div className={styles.cubeContainer}>{user.AnswerList.map((item,index)=>{
                if (item.Answer=="e") {
                  return(
                    <div className={styles.blankCube}>{index+1}</div>
                  )
                }else{
                  if (item.Result) {
                    return <div className={styles.trueCube}>{index+1}</div>
                  }
                  else{
                    return <div className={styles.wrongCube}>{index+1}</div>
                  }
                }
              })}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestDetailPage;
