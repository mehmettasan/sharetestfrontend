import React from 'react'

import MenuItem from './MenuItem/MenuItem'
import styles from "./Menu.module.css"
import { useAtom } from 'jotai'
import { activeMenuAtom } from '../../store/JotaiStore'

import { HomeOutlined,SettingOutlined,FileTextOutlined,PoweroffOutlined,PlusSquareOutlined,UserOutlined } from '@ant-design/icons'

const MenuItems=[
  {
    id:1,
    name:"home",
    title:"Anasayfa",
    icon:<HomeOutlined />,
    url:"/dashboard"
  },
  {
    id:2,
    name:"createTest",
    title:"Test Oluştur",
    icon:<PlusSquareOutlined />,
    url:"/dashboard/createtest"
  },
  {
    id:3,
    name:"viewTests",
    title:"Testleri Görüntüle",
    icon:<FileTextOutlined />,
    url:"/dashboard/viewtests"
  },
  {
    id:4,
    name:"profile",
    title:"Profil",
    icon:<UserOutlined />,
    url:"/dashboard/profile"
  },
  {
    id:6,
    name:"exit",
    title:"Çıkış",
    icon:<PoweroffOutlined />,
    url:"/dashboard/exit"
  },
]

const Menu = () => {
  const [activeMenu,setActiveMenu]=useAtom(activeMenuAtom)

  return (
    <div className={styles.container}>
      {
        MenuItems.map((item)=>
          <MenuItem icon={item.icon} isActive={activeMenu==item.name} item={item} key={item.id} />
        )
      }
    </div>
  )
}

export default Menu