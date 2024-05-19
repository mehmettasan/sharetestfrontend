import React, { useEffect, useState } from "react";

import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, message, Tooltip } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useAtom } from "jotai";
import { sessionAtom } from "../../store/JotaiStore";
import axios from "axios";

const RegisterPage = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [emailValidate, setEmailValidate] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const showerr = (text) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };

  const handleRegister = async () => {
    try {
      if (email==""||password==""||name==""||rePassword=="") {
        showerr("Tüm bilgiler doldurulmalıdır!");
        return
      }
      if (!emailRegex.test(email)) {
        showerr("Bir hata oluştu!. Lütfen bilgilerinizi kontrol ediniz!");
        setLoading(false);
        setErr(true);
        return;
      }
      if (password!=rePassword) {
        showerr("Şifreler uyuşmuyor!");
        return
      }
      const user = {
        name: name,
        email: email,
        password: password,
      };
      setLoading(true);
      const { data } = await axios.post("/auth/signup", user);
      setLoading(false);
      setSession(data.userId);
    } catch (error) {
      showerr();
      setLoading(false);
      setErr(true);
    }
  };

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session]);

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
            <h1 className={styles.formTitle}>Kayıt Ol</h1>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formLabel}>Ad Soyad</div>
            <Input
              className={styles.formInput}
              placeholder="Adınızı ve Soyadınızı giriniz"
              prefix={<UserOutlined />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <div className={styles.formLabel}>şifreyi tekrar giriniz</div>
            <Input.Password
              className={styles.formInput}
              placeholder="Şifrenizi tekrar giriniz"
              prefix={<KeyOutlined />}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <div>
              <Button
                className={styles.loginButton}
                type="primary"
                loading={loading}
                onClick={handleRegister}
                disabled={!emailValidate}
              >
                Kayıt Ol
              </Button>
            </div>
          </div>

          <div className={styles.loginFooter}>
            <div className={styles.footerText}>Bir hesabın var mı?</div>
            <Link className={styles.footerButton} to={"/login"}>
              <div>Giriş Yap</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
