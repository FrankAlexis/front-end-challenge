import React from 'react'
import { ShippingFormData, ShippingFormProps } from 'src/domain'
import { Controller, useForm } from 'react-hook-form'
import { useCountries } from '@/infra/hooks'
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Button } from 'ui-library'

export const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const { countries } = useCountries()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      country: '',
      phone: '',
    },
  })

  return (
    <Container maxWidth='sm'>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}
      >
        <Controller
          name='name'
          control={control}
          defaultValue=''
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Name'
              variant='outlined'
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name='email'
          control={control}
          defaultValue=''
          rules={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Email'
              type='email'
              variant='outlined'
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name='phone'
          control={control}
          defaultValue=''
          rules={{
            required: 'Phone is required',
            pattern: {
              value: /^\d{7,15}$/,
              message: 'Invalid phone number',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Phone'
              variant='outlined'
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />

        <Controller
          name='country'
          control={control}
          defaultValue=''
          rules={{
            required: 'Select a country',
          }}
          render={({ field }) => (
            <FormControl variant='outlined' error={!!errors.country}>
              <InputLabel id='country-label'>Country</InputLabel>
              <Select
                {...field}
                label='Country'
                labelId='country-label'
                id='country-select'
              >
                <MenuItem value=''>
                  <em>Select a country</em>
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <FormHelperText>{errors.country.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Button type='submit' size='large' disabled={!isValid}>
          Sent
        </Button>
      </Box>
    </Container>
  )
}
