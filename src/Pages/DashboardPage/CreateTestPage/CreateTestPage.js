import React, { useEffect, useState } from "react";

import styles from "./CreateTestPage.module.css";
import { PlusCircleOutlined,MinusCircleOutlined } from "@ant-design/icons";
import CreateItem from "../../../Components/CreateItem/CreateItem";
import { Input, InputNumber, Button } from "antd";
import { useAtom } from "jotai";
import {
  questionsAtom,
  activeMenuAtom,
  sessionAtom,
} from "../../../store/JotaiStore";
import axios from "axios";

const { TextArea } = Input;

const CreateTestPage = () => {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleMoreButton = () => {
    const id = questions[questions.length - 1].id + 1;
    let newArray = questions.slice();
    newArray.push({
      id: id,
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      trueAnswer: "a",
    });
    setQuestions(newArray);
  };

  const createTest = async () => {
    const test = {
      userId: session,
      questions: questions,
      testName: name,
      description: description,
      time: time,
    };
    setLoading(true);
    const { data } = await axios.post("/test/createtest", test);
    setLoading(false);
    setQuestions([
      {
        id: 1,
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        trueAnswer: "a",
      },
    ]);
  };

  const handleDecreaseBtn=()=>{
    let newArray = questions.slice();
    if (newArray.length>1) {
      newArray.pop();
      setQuestions(newArray);
    }
  } 

  useEffect(() => {
    setActiveMenu("createTest");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.testHeader}>
        <div className={styles.testHeaderSection}>
          <div className={styles.testHeaderElement}>
            <span>Test Adı</span>
            <Input
              className={styles.testHeaderInput1}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={styles.testHeaderElement}>
            <span>Soru başına düşen süre (saniye)</span>
            <InputNumber
              className={styles.testHeaderInput1}
              min={10}
              max={1000}
              value={time}
              onChange={(value) => {
                setTime(value);
              }}
            />
          </div>
        </div>
        <div className={styles.testHeaderSection2}>
          <span>Test Açıklaması</span>
          <TextArea
            className={styles.testHeaderInput2}
            style={{ resize: "none", height: "120px" }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.title1}>Sorular</div>
      <div className={styles.questionsContainer}>
        {questions.map((question) => (
          <CreateItem id={question.id} />
        ))}
      </div>
      <div style={{display:"flex"}}>
        <div className={styles.decreaseBtn} onClick={handleDecreaseBtn}>
          <MinusCircleOutlined />
        </div>
        <div className={styles.moreBtn} onClick={handleMoreButton}>
          <PlusCircleOutlined />
        </div>
      </div>
      <div>
        <Button className={styles.createButton} onClick={createTest}>
          Testi Oluştur
        </Button>
      </div>
    </div>
  );
};

export default CreateTestPage;
