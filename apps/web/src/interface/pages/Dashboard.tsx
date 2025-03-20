import { useState, useEffect } from 'react'
import { Typography, Container, Box, Grid2 } from '@mui/material'
import { useInvoices } from '@/infra/hooks'
import { Invoice } from '@/domain'
import {
  InvoicesList,
  InvoiceDetails,
  EmptyInvoiceDetails,
} from '@/interface/components'

const Dashboard = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const { invoices } = useInvoices()

  useEffect(() => {
    if (invoices.length > 0 && !selectedInvoice) {
      setSelectedInvoice(invoices[0])
    }
  }, [invoices, selectedInvoice])

  return (
    <Box>
      <Container maxWidth='xl'>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          sx={{
            mb: 4,
            color: '#000',
            fontWeight: 'medium',
          }}
        >
          Admin Dashboard
        </Typography>

        <Grid2 container spacing={3}>
          <Grid2>
            <InvoicesList
              invoices={invoices}
              selectedInvoice={selectedInvoice}
              onSelectInvoice={setSelectedInvoice}
            />
          </Grid2>

          <Grid2>
            {selectedInvoice ? (
              <InvoiceDetails invoice={selectedInvoice} />
            ) : (
              <EmptyInvoiceDetails />
            )}
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  )
}

export default Dashboard
