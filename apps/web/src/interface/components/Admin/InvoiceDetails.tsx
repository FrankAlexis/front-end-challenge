import { Box, Paper } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import {
  InvoiceCustomerInfo,
  InvoiceSummary,
  InvoiceProductsTable,
} from '@/interface/components'

import type { Invoice } from 'src/domain'
import { Button } from '@frankalexis/ui-library'
import { Link } from 'react-router-dom'

interface InvoiceDetailsProps {
  invoice: Invoice
}

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <h3 className='text-2xl font-bold  flex flex-col '>
            <span className='text-slate-800 text-left'>
              <span className='text-slate-500 font-normal'>Invoice</span> #
              {invoice.id.substring(0, 8)}
            </span>
            <span className='text-slate-500 font-normal'>
              Date: {new Date(invoice.date).toLocaleString()}
            </span>
          </h3>
        </Box>
        <Button
          variant='text'
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
          className='text-blue-500 hover:text-blue-700'
        >
          Print
        </Button>
      </Box>

      <div className='divider'>
        <div className='mb-2'>
          <InvoiceCustomerInfo shippingInfo={invoice.shippingInfo} />
        </div>
        <div className=''>
          <InvoiceSummary
            subtotal={invoice.subtotal}
            tax={invoice.tax}
            total={invoice.total}
          />
        </div>
      </div>
      <div className='divider' />
      <InvoiceProductsTable items={invoice.items} />

      <Button variant='text' component={Link} to='/products'>
        <span className='text-blue-500 hover:text-blue-700'>
          Continue shopping
        </span>
      </Button>
    </Paper>
  )
}
