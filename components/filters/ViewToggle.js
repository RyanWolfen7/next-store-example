import { Box, IconButton } from '@mui/material'
import ViewComfyRoundedIcon from '@mui/icons-material/ViewComfyRounded'
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded'

const ViewToggle = ({toggleView}) => {
  return (
    <Box sx={{display: {xs: 'none', sm: 'flex'}, alignItems: 'center'}}>
      <IconButton onClick={() => toggleView('vertical')}>
        <ViewComfyRoundedIcon sx={{ fontSize: 32 }} />
      </IconButton>
      <IconButton onClick={() => toggleView('horizontal')}>
        <ViewListRoundedIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  )
}

export default ViewToggle
