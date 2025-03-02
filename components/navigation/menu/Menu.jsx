import MenuItem from './MenuItem'
import MenuItems from '../../../mocks/MenuItems'
import { Box, List, ListItem, Badge, Link, IconButton } from '@mui/material'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import styles from '../../../styles/Navigation.module.scss'
import { useSelector } from 'react-redux'

const Menu = ({isMobile}) => {
  const { cart } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.user)
  return (
    <Box sx={{ pl: { xs: 2, lg: 4, xl: 8 } }} className={`${isMobile && styles.mobile_menu}`}>
      <List disablePadding className={`${styles.nav_menu_list}`}>
        {MenuItems.map((item) => {
          if (item.name === 'login' && user.token) {
            return
          } else if (item.name === 'dashboard' && !user.token) {
            return
          }
          return (
            <ListItem key={item.name}>
              <MenuItem item={item} />
            </ListItem>
          )
        })}
        <ListItem className={styles.cart_icon}>
          <div className={styles.nav_menu_item}>
            <Link href="/checkout">
              <span>VIEW CART</span>              
              <IconButton>
                <Badge sx={{ color: 'white.main' }} badgeContent={cart.length} color="accent">
                  <ShoppingCartRoundedIcon color="main" />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </ListItem>
      </List>
    </Box>
  )
}

export default Menu
