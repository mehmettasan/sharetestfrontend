import React from 'react'

import { Route, Routes } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import Dashboard from './DashboardPage/Dashboard';
import TestWelcomePage from './TestPage/TestWelcomePage/TestWelcomePage';
import TestAnswer from './TestPage/TestAnswer/TestAnswer';
import TestResultPage from './TestPage/TestResult/TestResultPage';



const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/startTest/:testCode" element={<TestWelcomePage />} />
        <Route path="/answerTest" element={<TestAnswer />} />
        <Route path="/testResult" element={<TestResultPage />} />
    </Routes>
  )
}

export default Router