import React, { useEffect, useState } from "react";

import styles from "./TestAnswer.module.css";
import { useAtomValue, useAtom } from "jotai";
import {
  TestAtom,
  sessionAtom,
  redirectTestIDAtom,
} from "../../../store/JotaiStore";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestAnswer = () => {
  const session = useAtomValue(sessionAtom);
  const [test, setTest] = useAtom(TestAtom);
  const [selected, setSelected] = useState("");
  const [questCount, setQuestCount] = useState(0);
  const [timer, setTimer] = useState(test ? test.time : 40);
  const [stopTime, setStopTime] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [redirect, setRedirect] = useAtom(redirectTestIDAtom);

  const handleSelect = (s) => {
    setSelected(s);
  };

  const handleFinish = async () => {
    setLoading(true);
    await sendAnswer();
    setRedirect(test?._id);
    setTest(null);
    setLoading(false);
    navigate("/testResult");
  };

  const sendAnswer = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/test/questionResult", {
        userID: session,
        testID: test._id,
        questionID: test?.questions[questCount]._id,
        answer: selected || "e",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNextQuestion = async () => {
    setLoading(true);
    await sendAnswer();
    handleTimerChange(test.time);
    setStopTime(false);
    setDisabled(false);
    setLoading(false);
    setSelected("");
    setQuestCount(questCount + 1);
  };

  useEffect(() => {
    if (test == null || session == null) {
      navigate("/dashboard");
    }
  }, [test]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!stopTime) {
        if (timer === 0) {
          setDisabled(true);
          setStopTime(true);
          setTimer(0);
        } else {
          setTimer(prevTimer => prevTimer - 1);
        }
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timer, stopTime]);

  const handleTimerChange = (newTimerValue) => {
    setTimer(newTimerValue);
    setStopTime(false);
    setDisabled(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.ContentContainer}>
        <div className={styles.infoContainer}>
          <div>
            Soru : {questCount + 1}/{test?.questions.length}
          </div>
          <div>Kalan Süre: {timer}</div>
        </div>
        <div className={styles.questionContainer}>
          {test?.questions[questCount].question}
        </div>
        <div className={styles.answerContainer}>
          <div className={styles.answerSeciton}>
            <div
              onClick={() => {
                if (!disabled) {
                  handleSelect("a");
                }
              }}
              className={
                disabled
                  ? styles.disabledAnswerItem
                  : selected === "a"
                  ? styles.selectedAnswerItem
                  : styles.answerItem
              }
            >
              {test?.questions[questCount].optionA}
            </div>
            <div
              onClick={() => {
                if (!disabled) {
                  handleSelect("b");
                }
              }}
              className={
                disabled
                  ? styles.disabledAnswerItem
                  : selected === "b"
                  ? styles.selectedAnswerItem
                  : styles.answerItem
              }
            >
              {test?.questions[questCount].optionB}
            </div>
          </div>
          <div className={styles.answerSeciton}>
            <div
              onClick={() => {
                if (!disabled) {
                  handleSelect("c");
                }
              }}
              className={
                disabled
                  ? styles.disabledAnswerItem
                  : selected === "c"
                  ? styles.selectedAnswerItem
                  : styles.answerItem
              }
            >
              {test?.questions[questCount].optionC}
            </div>
            <div
              onClick={() => {
                if (!disabled) {
                  handleSelect("d");
                }
              }}
              className={
                disabled
                  ? styles.disabledAnswerItem
                  : selected === "d"
                  ? styles.selectedAnswerItem
                  : styles.answerItem
              }
            >
              {test?.questions[questCount].optionD}
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            loading={loading}
            onClick={
              test?.questions.length == questCount + 1
                ? handleFinish
                : handleNextQuestion
            }
            className={styles.nextBtn}
          >
            {test?.questions.length == questCount + 1
              ? "Testi Bitir"
              : "Sonraki Soru"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestAnswer;
