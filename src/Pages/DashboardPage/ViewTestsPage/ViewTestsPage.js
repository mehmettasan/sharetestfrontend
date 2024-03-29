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
            setTests(data.tests)
        }
    }

    useEffect(()=>{
        getTests();
        setActiveMenu("viewTests");
    },[])

  return (
    <div className={styles.container}>
        {tests.map((item)=><ViewTestItem item={item} />)}
    </div>
  )
}

export default ViewTestsPage