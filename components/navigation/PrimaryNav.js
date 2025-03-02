import { useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/Navigation.module.scss'
import Menu from './menu/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Container, Toolbar, IconButton } from '@mui/material'

const NavAppBar = () => {
  const [isOpen, setState] = useState(false)

  const openMobileMenu = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState(open)
  }

  return (
    <AppBar position="static" color="white" sx={{ boxShadow: 1 }}>
      <Box sx={{maxWidth: 1200, margin: 'auto', width: '100%'}}>
        <Toolbar disableGutters sx={{minHeight: {xs: 72}}}>
          <Box 
            sx={{ml: 2, minWidth: {xs: 220, lg: 294}, display: 'flex', flexGrow: 1}}>
            <Image
              id="nav_logo"
              src="/logo.png"
              width={294}
              height={26}
              alt="Trader logo"
            />
          </Box>
          <Menu isMobile={isOpen} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className={styles.hamburger}
            onClick={openMobileMenu(!isOpen)}
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default NavAppBar
