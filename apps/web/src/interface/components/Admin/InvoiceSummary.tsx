import { Typography, Box, Divider } from '@mui/material'
import { formatPrice } from '@/infra/utils'

interface InvoiceSummaryProps {
  subtotal: number
  tax: number
  total: number
}

export const InvoiceSummary = ({
  subtotal,
  tax,
  total,
}: InvoiceSummaryProps) => {
  return (
    <>
      <Typography variant='h6' component='h4' gutterBottom>
        Summary
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 0.5,
        }}
      >
        <Typography variant='body2'>Subtotal:</Typography>
        <Typography variant='body2'>{formatPrice(subtotal)}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 0.5,
        }}
      >
        <Typography variant='body2'>Taxes:</Typography>
        <Typography variant='body2'>{formatPrice(tax)}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 0.5,
        }}
      >
        <Typography variant='subtitle2' fontWeight='bold'>
          Total:
        </Typography>
        <Typography variant='subtitle2' fontWeight='bold'>
          {formatPrice(total)}
        </Typography>
      </Box>
    </>
  )
}
