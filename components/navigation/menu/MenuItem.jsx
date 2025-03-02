import { useState } from 'react'
import SubMenu from './SubMenu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../../styles/Navigation.module.scss'
import { Link } from '@mui/material'

const MenuItem = ({ item }) => {
  const [isSubMenuShow, setIsSubMenuShow] = useState(false)

  const openDropDown = (e) => {
    e.preventDefault()
    setIsSubMenuShow(!isSubMenuShow)
  }

  return (
    <div 
      className={styles.nav_menu_item}
    >
      <div
        onMouseOver={() => setIsSubMenuShow(true)}
        onMouseLeave={() => setIsSubMenuShow(false)}
      >
        <Link href={item.url ? item.url : '#!'}>
          {item.name}
          {item.child ? 
            <div className={styles.drpdn_icon} onClick={openDropDown}>
              <ExpandMoreIcon fontSize="small" />
            </div> 
            : ''}
        </Link>
      </div>
      {item.child && isSubMenuShow &&
        <SubMenu
          dropDownItem={item.child} 
          onMouseOver={() => setIsSubMenuShow(true)}
          onMouseLeave={() => setIsSubMenuShow(false)}
        />}
    </div>
  )
}

export default MenuItem
