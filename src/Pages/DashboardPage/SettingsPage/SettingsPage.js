import React,{useEffect} from 'react'

import styles from "./SettingsPage.module.css"
import { useAtom } from "jotai";
import { activeMenuAtom } from "../../../store/JotaiStore";

const SettingsPage = () => {
    const [activeMenu,setActiveMenu]=useAtom(activeMenuAtom)

    useEffect(()=>{
        setActiveMenu("settings")
      },[])
      
  return (
    <div className={styles.container}>SettingsPage</div>
  )
}

export default SettingsPage