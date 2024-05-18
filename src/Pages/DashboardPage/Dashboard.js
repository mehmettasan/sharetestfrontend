import React, { useEffect } from "react";

import { Route, Routes,useNavigate } from "react-router-dom";

import DHomePage from "./DHomePage/DHomePage";
import CreateTestPage from "./CreateTestPage/CreateTestPage";
import ExitPage from "./ExitPage/ExitPage";
import ViewTestsPage from "./ViewTestsPage/ViewTestsPage";
import Menu from "../../Components/Menu/Menu"

import styles from "./Dashboard.module.css";
import { useAtom } from "jotai";
import { sessionAtom } from "../../store/JotaiStore";
import TestDetailPage from "./TestDetailPage/TestDetailPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import SettingsPage from "./SettingsPage/SettingsPage";
import QPoolPage from "./QuestionPoolPage/QPoolPage";


const Dashboard = () => {
  const [session,setSession]=useAtom(sessionAtom)
  const navigate = useNavigate()

  useEffect(()=>{
    if (!session) {
      navigate("/login")
    }
  },[session])
  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <Menu />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>SHARE TEST</div>
          <div className={styles.profileContainer}>  
               
          </div>
        </div>
        <div className={styles.pageContainer}>
          <Routes>
            <Route path="/" element={<DHomePage />} />
            <Route path="/createtest" element={<CreateTestPage />} />
            <Route path="/viewtests" element={<ViewTestsPage />} />
            <Route path="/viewtests/:testId" element={<TestDetailPage />} />
            <Route path="/questionpool" element={<QPoolPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/exit" element={<ExitPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
