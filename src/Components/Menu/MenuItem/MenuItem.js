import React from 'react'

import styles from "./MenuItem.module.css"
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { activeMenuAtom } from '../../../store/JotaiStore'

const MenuItem = ({icon,isActive,item}) => {
  const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom)

  return (
    <Link to={item.url}>
    <div className={isActive ? styles.containerActive : styles.container}>
        {icon}
    </div>
    </Link>
  )
}

export default MenuItem