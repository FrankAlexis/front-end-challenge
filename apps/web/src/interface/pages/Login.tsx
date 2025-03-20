import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '@/infra/hooks'
import { Controller, useForm } from 'react-hook-form'
import { Button } from 'ui-library'

interface LoginFormValues {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const success = await login(data.email, data.password)
      if (!success) {
        setError('password', {
          type: 'manual',
          message: 'The password is incorrect',
        })
      }
      navigate('/admin')
    } catch (err) {
      console.error(err)
      setError('root', {
        type: 'manual',
        message: 'The email or password is incorrect',
      })
    }
  }
  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 10,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
        <Typography
          variant='h5'
          component='h2'
          gutterBottom
          align='center'
          sx={{
            mb: 3,
          }}
        >
          Login
        </Typography>
        {errors.root && (
          <Alert severity='error' sx={{ mb: 3 }}>
            {errors.root.message}
          </Alert>
        )}
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Email'
                type='email'
                fullWidth
                margin='normal'
                variant='outlined'
                placeholder='example@admin.com'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isSubmitting}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Password'
                type='password'
                fullWidth
                margin='normal'
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message || 'Minimum 6 characters'}
                disabled={isSubmitting}
                sx={{ mb: 3 }}
              />
            )}
          />

          <Button type='submit' fullWidth size='large' disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
