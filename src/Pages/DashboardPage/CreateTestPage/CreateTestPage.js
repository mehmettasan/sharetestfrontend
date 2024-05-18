import React, { useEffect, useState } from "react";

import styles from "./CreateTestPage.module.css";
import { PlusCircleOutlined, MinusCircleOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import CreateItem from "../../../Components/CreateItem/CreateItem";
import { Input, InputNumber, Button, message, Modal, Select } from "antd";
import { useAtom } from "jotai";
import {
  questionsAtom,
  activeMenuAtom,
  sessionAtom,
} from "../../../store/JotaiStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateTestPage = () => {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qPoolQuests, setQPoolQuests] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const showerr = () => {
    messageApi.open({
      type: "error",
      content:
        "Bir hata oluştu! Lütfen tüm bilgileri doğru ve eksiksiz doldurunuz!",
    });
  };

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

  const handleOk = () => {
    setIsModalOpen(false);
    let filteredMap = qPoolQuests.filter((item)=>selectedQuestions.includes(item._id))
    let curid=0
    filteredMap = filteredMap.map(item=>{
      curid+=1;
      return {...item,id:curid}
    })
    console.log(filteredMap)
    if (filteredMap.length!=0) {
      setQuestions(filteredMap)
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setSelectedQuestions(value);
  };

  const createTest = async () => {
    try {
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
      setName("");
      setDescription("");
      setTime(10);
      navigate("/dashboard/viewtests/" + data.test._id);
    } catch (error) {
      showerr();
    }
  };

  const handleDecreaseBtn = () => {
    let newArray = questions.slice();
    if (newArray.length > 1) {
      newArray.pop();
      setQuestions(newArray);
    }
  };

  const getPool = async () => {
    try {
      const { data } = await axios.post("/user/getQPool", {
        userID: session,
      });
      setQPoolQuests(data.data.questions);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    setActiveMenu("createTest");
    getPool();
  }, []);

  return (
    <div className={styles.container}>
      {contextHolder}
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
      <div style={{ width: "90%", marginBottom: "10px" }}>
        <Button
          type="primary"
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Havuzdan Seç
        </Button>
      </div>
      <div className={styles.questionsContainer}>
        {questions.map((question) => (
          <CreateItem id={question.id} key={question.id} />
        ))}
      </div>
      <div style={{ display: "flex" }}>
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
      <Modal
        title="Basic Modal"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.modalContent}>
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="select one country"
            onChange={handleChange}
            tagRender={"gold"}
          >
            {qPoolQuests?.map((quest) => {
              return (
                <Select.Option key={quest._id} value={quest._id}>
                  {quest.question}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTestPage;
