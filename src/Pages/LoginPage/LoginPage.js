import React, { useEffect, useState } from "react";

import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { sessionAtom } from "../../store/JotaiStore";
import { useAtom } from "jotai";
import axios from "axios";

const LoginPage = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session]);

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };
    setLoading(true);
    const { data } = await axios.post("/auth/login", user);
    setLoading(false);
    setSession(data.userId);
  };

  return (
    <div className={styles.container}>
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
              onChange={(e)=>setEmail(e.target.value)}
            />
            <div className={styles.formLabel}>şifre</div>
            <Input.Password
              className={styles.formInput}
              placeholder="Şifrenizi giriniz"
              prefix={<KeyOutlined />}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <div className={styles.formLabel}>şifreni mi unuttun?</div>
            <div>
              <Button
                className={styles.loginButton}
                type="primary"
                onClick={handleLogin}
                loading={loading}
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
