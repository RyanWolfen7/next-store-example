import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ImportExportIcon from '@mui/icons-material/ImportExport'

const options = {
  sort_by: 'Sort By',
  price_low_high: 'Price (low to high)',
  price_high_low: 'Price (high to low)',
  a_z: 'Alphabetical (A-Z)'
}

const StoreSort = ({sortProducts}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const open = Boolean(anchorEl)

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    sortProducts(Object.keys(options)[index])
    setSelectedIndex(index)
    setAnchorEl(null) 
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem} 
        variant="outlined" 
        color="main" 
        startIcon={<ImportExportIcon />}>
        <strong>{Object.values(options)[selectedIndex]}</strong>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {Object.values(options).map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default StoreSort
