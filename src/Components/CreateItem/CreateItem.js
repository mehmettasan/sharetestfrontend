import React, { useEffect, useState } from "react";

import styles from "./CreateItem.module.css";
import { Input } from "antd";
import { useAtom } from "jotai";
import { questionsAtom } from "../../store/JotaiStore";

const { TextArea } = Input;

const CreateItem = ({ id }) => {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [currentQuestion, setCurrentQuestion] = useState({ 
    id:id,
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    trueAnswer: "a"
  });

  useEffect(() => {
    const question = questions.filter((item) => item.id == id)[0];
    console.log(question)
    setCurrentQuestion(question);
  }, [questions]);

  const textChange = (value, selection) => {
    const newArray = questions.map((item) => {
      if (item.id != id) {
        return item;
      } else {
        switch (selection) {
          case "question":
            item.question = value;
            break;
          case "optionA":
            item.optionA = value;
            break;
          case "optionB":
            item.optionB = value;
            break;
          case "optionC":
            item.optionC = value;
            break;
          case "optionD":
            item.optionD = value;
            break;
          case "trueAnswer":
            item.trueAnswer = value;
            break;
          default:
            break;
        }
        return item;
      }
    });
    setQuestions(newArray);
  };

  return (
    <div className={styles.container}>
      <div className={styles.countText}>Soru {id}</div>
      <div className={styles.quest}>
        <TextArea
          className={styles.questInput}
          placeholder="Lütfen Soruyu Yazınız..."
          style={{ resize: "none" }}
          value={currentQuestion.question}
          onChange={(e) => textChange(e.target.value, "question")}
        />
      </div>

      <div className={styles.answerSection}>
        <div className={styles.answerItem}>
          <input
            className={styles.radioItem}
            type="radio"
            name={id}
            value={"a"}
            checked={currentQuestion.trueAnswer === "a"}
            onChange={() => textChange("a","trueAnswer")}
          />
          <TextArea
            className={styles.answer}
            placeholder="A Şıkkı"
            value={currentQuestion.optionA}
            onChange={(e) => textChange(e.target.value, "optionA")}
          />
        </div>
        <div className={styles.answerItem}>
          <input
            className={styles.radioItem}
            type="radio"
            name={id}
            value={"b"}
            checked={currentQuestion.trueAnswer == "b"}
            onChange={() => textChange("b","trueAnswer")}
          />
          <TextArea
            className={styles.answer}
            placeholder="B Şıkkı"
            value={currentQuestion.optionB}
            onChange={(e) => textChange(e.target.value, "optionB")}
          />
        </div>
      </div>
      <div className={styles.answerSection}>
        <div className={styles.answerItem}>
          <input
            className={styles.radioItem}
            type="radio"
            name={id}
            value={"c"}
            checked={currentQuestion.trueAnswer == "c"}
            onChange={() => textChange("c","trueAnswer")}
          />
          <TextArea
            className={styles.answer}
            placeholder="C Şıkkı"
            value={currentQuestion.optionC}
            onChange={(e) => textChange(e.target.value, "optionC")}
          />
        </div>
        <div className={styles.answerItem}>
          <input
            className={styles.radioItem}
            type="radio"
            name={id}
            value={"d"}
            checked={currentQuestion.trueAnswer == "d"}
            onChange={() => textChange("d","trueAnswer")}
          />
          <TextArea
            className={styles.answer}
            placeholder="D Şıkkı"
            value={currentQuestion.optionD}
            onChange={(e) => textChange(e.target.value, "optionD")}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
