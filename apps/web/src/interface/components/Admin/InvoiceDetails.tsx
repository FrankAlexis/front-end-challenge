import { Box, Typography, Paper, Grid2 } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import {
  InvoiceCustomerInfo,
  InvoiceSummary,
  InvoiceProductsTable,
} from '@/interface/components'

import type { Invoice } from 'src/domain'
import { Button } from 'ui-library'

interface InvoiceDetailsProps {
  invoice: Invoice
}

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography
            variant='h5'
            component='h3'
            gutterBottom
            sx={{ fontWeight: 'medium', color: '#03356b' }}
          >
            Invoice #{invoice.id.substring(0, 8)}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {new Date(invoice.date).toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant='text'
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          sx={{
            color: '#03356b',
          }}
        >
          Print
        </Button>
      </Box>

      <Grid2 container spacing={3} sx={{ mb: 4 }}>
        <Grid2>
          <InvoiceCustomerInfo shippingInfo={invoice.shippingInfo} />
        </Grid2>
        <Grid2>
          <InvoiceSummary
            subtotal={invoice.subtotal}
            tax={invoice.tax}
            total={invoice.total}
          />
        </Grid2>
      </Grid2>

      <InvoiceProductsTable items={invoice.items} />
    </Paper>
  )
}
