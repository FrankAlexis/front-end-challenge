import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { ShippingForm } from '../components/ShippingForm'
import { useInvoices, useCart } from '@/infra/hooks'
import { CartItem, Invoice, ShippingFormData } from 'src/domain'
import { formatPrice } from '@/infra/utils'
import { InvoiceDetails } from '../components'

const Checkout: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart()
  const [lastCartItems, setLastCartItems] = useState<CartItem[]>([])
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const { generateInvoice } = useInvoices()

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const handleShippingSubmit = (shippingData: ShippingFormData) => {
    setLastCartItems(cart)
    const invoice = generateInvoice(shippingData)
    setInvoice(invoice)
  }

  if (cart.length === 0 && lastCartItems.length === 0) {
    return (
      <section className='flex items-center justify-center h-screen'>
        The shopping cart is empty. Please add items to the cart before
        proceeding to checkout.
      </section>
    )
  }

  return (
    <Container maxWidth='md' sx={{}}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
        {!invoice ? (
          <>
            <Typography variant='h4' component='h2' gutterBottom>
              Details
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <List>
                {cart.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          edge='end'
                          aria-label='remove'
                          onClick={() => removeFromCart(item.id)}
                          size='small'
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          edge='end'
                          aria-label='add'
                          onClick={() => addToCart(item)}
                          disabled={item.quantity >= item.stock}
                          size='small'
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity} * $${item.price}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant='h6' align='right' sx={{ mt: 2 }}>
                Total: {formatPrice(total)}
              </Typography>
            </Paper>

            <Typography variant='h4' component='h2' gutterBottom>
              Shipping Information
            </Typography>
            <ShippingForm onSubmit={handleShippingSubmit} />
          </>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant='h4' component='h2' gutterBottom>
              Purchase Completed!
            </Typography>
            <InvoiceDetails invoice={invoice} />
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default Checkout
