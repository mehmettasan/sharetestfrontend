import React,{useEffect, useState} from 'react'

import styles from "./ProfilePage.module.css"
import { useAtom } from "jotai";
import { activeMenuAtom,sessionAtom } from "../../../store/JotaiStore";
import axios from 'axios';

const ProfilePage = () => {
    const [activeMenu,setActiveMenu]=useAtom(activeMenuAtom)
    const [session,setSession]=useAtom(sessionAtom)
    const [tests,setTests]= useState([])

    const getUserTests = async()=>{
        const {data} = await axios.post("/test/getATestUserResult",{
            userID:session
        })
        setTests(arraySort(data))
    }

    const calculateAnswers = (answers) => {
        let truecount = 0;
        let wrongCount = 0;
        let blankCount = 0;
    
        answers.map((item) => {
          if (item.Answer == "e") {
            blankCount++;
          } else {
            if (item.Result) {
              truecount++;
            } else {
              wrongCount++;
            }
          }
        });
    
        return { truecount, wrongCount, blankCount };
      };

      const arraySort =(arr) => {
        let newArray = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            newArray.push(arr[i]);
        }
        return newArray;
    }

    useEffect(()=>{
        setActiveMenu("profile")
        getUserTests()
      },[])

  return (
    <div className={styles.container}>
        <div className={styles.title1}>Katılınan Testler</div>
        <div className={styles.testsContainer}>
        {tests.map((item) => {
          let test = item.Answers[0]
          const counts = calculateAnswers(test.AnswerList)
          return (
            <div className={styles.userDetailContainer} key={test.TestId}>
              <div>{item.TestName}</div>
              <div>
                <div style={{color:"#089404"}}>Doğru: {counts.truecount}</div>
                <div style={{color:"#8B0000"}}>Yanlış: {counts.wrongCount}</div>
                <div style={{color:"#9ECAEF"}}>Boş: {counts.blankCount}</div>
              </div>
              <div className={styles.cubeContainer}>{test.AnswerList.map((item,index)=>{
                if (item.Answer=="e") {
                  return(
                    <div className={styles.blankCube}>{index+1}</div>
                  )
                }else{
                  if (item.Result) {
                    return <div className={styles.trueCube}>{index+1}</div>
                  }
                  else{
                    return <div className={styles.wrongCube}>{index+1}</div>
                  }
                }
              })}</div>
            </div>
          );
        })}
        </div>
    </div>
  )
}

export default ProfilePage