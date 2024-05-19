import React, { useEffect, useState } from 'react'

import styles from "./ViewTestsPage.module.css"
import ViewTestItem from '../../../Components/ViewTestItem/ViewTestItem'
import axios from 'axios'
import { useAtom } from 'jotai'
import { sessionAtom,activeMenuAtom } from '../../../store/JotaiStore'

const ViewTestsPage = () => {
    const [tests,setTests]=useState([])
    const [session,setSession]=useAtom(sessionAtom)
    const [activeMenu,setActiveMenu]=useAtom(activeMenuAtom)

    const getTests = async()=>{
        const {data}= await axios.post("/test/getusersalltest",{userId:session})
        if (data.tests) {
            setTests(arraySort(data.tests))
        }
    }

    useEffect(()=>{
        getTests();
        setActiveMenu("viewTests");
    },[])

  return (
    <div className={styles.container}>
        <div className={styles.pageTitle}>Oluşturduğunuz Testler</div>
        {tests.map((item)=><ViewTestItem key={item._id} item={item} />)}
    </div>
  )
}

const arraySort =(arr) => {
    let newArray = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArray.push(arr[i]);
    }
    return newArray;
}

export default ViewTestsPage