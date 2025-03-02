import { Link, List, ListItem } from '@mui/material'
import styles from '../../../styles/Navigation.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { updateUser } from '../../../store/user/reducer'

const SubMenu = ({ dropDownItem, onMouseOver, onMouseLeave }) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(updateUser({}))
    Router.push('/login')
  }

  return (
    <div
      className={styles.nav_drop_down}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <List disablePadding>
        {dropDownItem.map((item) => {
          const isLogout = item.name.toLowerCase() === 'logout'
          return <ListItem key={item.name}>
            {
              isLogout ?
                <Link onClick={logout} sx={{ cursor: 'pointer' }}>
                  {item.name}
                </Link>
                : <Link href={item.url}>
                  {
                    item.icon ?
                      <svg width="18" height="20">
                        <image xlinkHref={item.icon} width="18" height="20" />
                      </svg>
                      : ''
                  }
                  {item.name}
                </Link>
            }

          </ListItem>
        })}
      </List>
    </div>
  )
}

export default SubMenu
