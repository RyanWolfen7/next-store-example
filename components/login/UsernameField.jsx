import { FormControl, TextField } from '@mui/material'

const UsernameField = ({loginState, handleChange, isSubmit}) => {
  return (
    <FormControl sx={{ mb: 3, width: '40ch' }} variant="outlined">
      <TextField
        type="email"
        autoComplete="username"
        label="Username or Email"
        value={loginState.username}
        onChange={handleChange('username')}
        error={loginState.username === '' && isSubmit}
        helperText={loginState.username === '' && isSubmit ? 'This field is required' : ''}
      />
    </FormControl>
  )
}

export default UsernameField
