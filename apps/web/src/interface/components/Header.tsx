import {
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import {
  ShoppingCart as CartIcon,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useCart } from '@/infra/hooks'
import { Button } from 'ui-library'

export const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { cartItemCount } = useCart()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
    navigate('/')
  }
  return (
    <header className='sticky top-0 z-10 bg-[#b1b2c3] '>
      <div className='flex items-center justify-between p-4'>
        <Button variant='text' component={Link} to='/'>
          <h1 className='flex-grow font-bold flex items-center gap-1 text-xl text-white'>
            <img src='vite.svg' alt='Logo' className='h-8 w-8' />
            Online Store
          </h1>
        </Button>

        <div className='flex items-center gap-1 flex-wrap max-w-full overflow-hidden mr-2 p-0.5'>
          {isAuthenticated ? (
            <>
              <Button
                variant='text'
                component={Link}
                to='/admin'
                sx={{
                  display: { xs: 'none', sm: 'inline-flex', color: 'white' },
                }}
              >
                Invoices
              </Button>
              <Button
                variant='text'
                onClick={handleMenu}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  textTransform: 'none',
                  color: 'white',
                }}
              >
                {user?.email || 'Usuario'}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant='body2' color='text.secondary'>
                    {user?.name}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant='text'
                component={Link}
                to='/'
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  color: 'white',
                }}
              >
                Home
              </Button>
              <Button
                variant='text'
                component={Link}
                to='/products'
                sx={{
                  display: { xs: 'none', sm: 'inline-flex', color: 'white' },
                }}
              >
                Products
              </Button>
              <Button
                variant='text'
                component={Link}
                to='/login'
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  color: 'white',
                }}
              >
                Login
              </Button>
              <IconButton color='inherit' component={Link} to='/checkout'>
                <Badge badgeContent={cartItemCount} color='success'>
                  <CartIcon />
                </Badge>
              </IconButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
