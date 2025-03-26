import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material'
import { useCart } from '@/infra/hooks'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Button } from '@frankalexis/ui-library'
import { Product } from 'src/domain'
import { formatPrice } from '@/infra/utils'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, getProductQuantityInCart, removeFromCart } = useCart()

  const quantityInCart = getProductQuantityInCart(product.id)

  return (
    <Card>
      <CardMedia
        component='img'
        height='194'
        image='https://placehold.co/300x200'
        alt={product.name}
      />
      <CardContent>
        <h5 className='text-lg font-semibold text-center'>{product.name}</h5>
        <div>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold'>Category:</span> {product.category}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold mr-1'>Price:</span>
            {formatPrice(product.price)}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold'>Stock:</span> {product.stock}
          </p>
        </div>
      </CardContent>
      <CardActions>
        <div className='flex items-center justify-between w-full px-2 text-center'>
          {quantityInCart > 0 && (
            <IconButton
              color='primary'
              disabled={quantityInCart === 0}
              onClick={() => removeFromCart(product.id)}
              aria-label='Decrease quantity'
            >
              <RemoveIcon />
            </IconButton>
          )}

          {quantityInCart > 0 && (
            <Typography sx={{ mx: 1 }}>{quantityInCart}</Typography>
          )}
          {quantityInCart === 0 ? (
            <Button
              variant='text'
              disabled={product.stock === 0 || quantityInCart >= product.stock}
              onClick={() => addToCart(product)}
              aria-label={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
              className={
                product.stock === 0
                  ? 'cursor-not-allowed w-full text-gray-400'
                  : 'w-full text-blue-300 cursor-pointer'
              }
            >
              {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </Button>
          ) : (
            <IconButton
              color='primary'
              disabled={product.stock === 0 || quantityInCart >= product.stock}
              onClick={() => addToCart(product)}
              aria-label='Increase quantity'
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  )
}
