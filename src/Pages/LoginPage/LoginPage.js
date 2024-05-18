import React, { useEffect, useState } from "react";

import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, message, Tooltip } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { sessionAtom } from "../../store/JotaiStore";
import { useAtom } from "jotai";
import axios from "axios";

const LoginPage = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [emailValidate, setEmailValidate] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session]);

  const showerr = () => {
    messageApi.open({
      type: "error",
      content: "E-posta veya şifre hatalı!",
    });
  };

  const handleLogin = async () => {
    try {
      if (!emailRegex.test(email)) {
        showerr();
        setLoading(false);
        setErr(true);
        return;
      }
      const user = {
        email,
        password,
      };
      setLoading(true);
      const { data } = await axios.post("/auth/login", user);
      setLoading(false);
      setSession(data.userId);
    } catch (error) {
      showerr();
      setLoading(false);
      setErr(true);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.header}>
        <div>
          <Link to={"/"} className={styles.title}>
            <h1>SHARE TEST</h1>
          </Link>
        </div>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.titleContainer}>
            <h1 className={styles.formTitle}>Giriş Yap</h1>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formLabel}>e-posta</div>
            <Input
              className={styles.formInput}
              placeholder="E-posta adresinizi giriniz"
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => {
                setEmailValidate(emailRegex.test(e.target.value));
                setEmail(e.target.value);
              }}
              status={!emailValidate && "error"}
              suffix={
                !emailValidate && (
                  <Tooltip title="Lütfen Geçerli bir mail adresi giriniz">
                    <InfoCircleOutlined
                      style={{
                        color: "rgba(255,0,0,.45)",
                      }}
                    />
                  </Tooltip>
                )
              }
            />
            <div className={styles.formLabel}>şifre</div>
            <Input.Password
              className={styles.formInput}
              placeholder="Şifrenizi giriniz"
              prefix={<KeyOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.formLabel}>şifreni mi unuttun?</div>
            <div>
              <Button
                className={styles.loginButton}
                type="primary"
                onClick={handleLogin}
                loading={loading}
                disabled={!emailValidate}
              >
                Giriş Yap
              </Button>
            </div>
          </div>

          <div className={styles.loginFooter}>
            <div className={styles.footerText}>Bir hesabın yok mu?</div>
            <Link className={styles.footerButton} to={"/register"}>
              <div>Kayıt Ol</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
