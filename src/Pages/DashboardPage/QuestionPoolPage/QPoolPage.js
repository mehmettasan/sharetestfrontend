import React, { useEffect, useState } from "react";

import styles from "./QPoolPage.module.css";
import { Input, Button, message } from "antd";
import { useAtom } from "jotai";
import { activeMenuAtom, sessionAtom } from "../../../store/JotaiStore";
import axios from "axios";

const { TextArea } = Input;

const QPoolPage = () => {
  const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
  const [user, setUser] = useAtom(sessionAtom);
  const [qpoolquests, setQpoolQuests] = useState([]);
  const [question, setQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    trueAnswer: "a",
  });
  const id = 1;
  useEffect(() => {
    setActiveMenu("QPool");
  }, []);
  const [messageApi, contextHolder] = message.useMessage();

  const showerr = () => {
    messageApi.open({
      type: "error",
      content:
        "Bir hata oluştu! Lütfen tüm bilgileri doğru ve eksiksiz doldurunuz!",
    });
  };

  const handleAdd = async () => {
    try {
      const { data } = await axios.post("/user/addQPool", {
        userID: user,
        question: question,
      });
      setQpoolQuests(data.data.questions);
    } catch (error) {
      showerr();
    }
  };

  const getPool =async()=>{
    try {
      const {data}=await axios.post("/user/getQPool",{
        userID:user
      })
      setQpoolQuests(data.data.questions)
    } catch (error) {
      
    }
  }

  const deleteQpool=async(qid)=>{
    try {
      const {data}=await axios.post("/user/removeQPool",{
        userID:user,
        questionId:qid,
      })
      setQpoolQuests(data.data.questions)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getPool()
  },[])

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.title1}>Soru Havuzu</div>
      <div className={styles.qcontainer}>
        <div className={styles.countText}>Soru {id}</div>
        <div className={styles.quest}>
          <TextArea
            className={styles.questInput}
            placeholder="Lütfen Soruyu Yazınız..."
            style={{ resize: "none" }}
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
          />
        </div>

        <div className={styles.answerSection}>
          <div className={styles.answerItem}>
            <input
              className={styles.radioItem}
              type="radio"
              name={id}
              value={"a"}
              checked={question.trueAnswer === "a"}
              onChange={(e) => setQuestion({ ...question, trueAnswer: "a" })}
            />
            <TextArea
              className={styles.answer}
              placeholder="A Şıkkı"
              value={question.optionA}
              onChange={(e) =>
                setQuestion({ ...question, optionA: e.target.value })
              }
            />
          </div>
          <div className={styles.answerItem}>
            <input
              className={styles.radioItem}
              type="radio"
              name={id}
              value={"b"}
              checked={question.trueAnswer === "b"}
              onChange={(e) => setQuestion({ ...question, trueAnswer: "b" })}
            />
            <TextArea
              className={styles.answer}
              placeholder="B Şıkkı"
              value={question.optionB}
              onChange={(e) =>
                setQuestion({ ...question, optionB: e.target.value })
              }
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
              checked={question.trueAnswer === "c"}
              onChange={(e) => setQuestion({ ...question, trueAnswer: "c" })}
            />
            <TextArea
              className={styles.answer}
              placeholder="C Şıkkı"
              value={question.optionC}
              onChange={(e) =>
                setQuestion({ ...question, optionC: e.target.value })
              }
            />
          </div>
          <div className={styles.answerItem}>
            <input
              className={styles.radioItem}
              type="radio"
              name={id}
              value={"d"}
              checked={question.trueAnswer === "d"}
              onChange={(e) => setQuestion({ ...question, trueAnswer: "d" })}
            />
            <TextArea
              className={styles.answer}
              placeholder="D Şıkkı"
              value={question.optionD}
              onChange={(e) =>
                setQuestion({ ...question, optionD: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 15 }}>
        <Button className={styles.createButton} onClick={handleAdd}>
          Soru Ekle
        </Button>
      </div>
      <div className={styles.title1}>Sorularım</div>
      <div className={styles.questionCont}>
        {qpoolquests.length == 0 ? (
          <div>Havuzunuzda henüz soru yok.</div>
        ) : (
          qpoolquests.map((quest) => {
            return (
              <div className={styles.questContainer} key={quest._id}>
                <div className={styles.closeBTN} onClick={(e)=>{deleteQpool(quest._id)}}>X</div>
                <div className={styles.questionText}>{quest.question}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default QPoolPage;
