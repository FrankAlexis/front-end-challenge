import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from '../ProductCard'
import { CartItem, ProductCategory } from '../../types'

const mockAddToCart = jest.fn()
const mockRemoveFromCart = jest.fn()
let mockCart: CartItem[] = []

jest.mock('@store/productStore', () => ({
  useCart: () => ({
    cart: mockCart,
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
  }),
}))

describe('ProductCard component', () => {
  const mockProduct = {
    id: 1,
    name: 'Manzana Roja',
    price: 2000,
    stock: 50,
    category: ProductCategory.FRESH_FRUITS,
    tax: 0.19,
  }

  it('should render the product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Manzana Roja')).toBeInTheDocument()
    expect(screen.getByText('$2,000.00')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('should call addToCart function when it is clicked', () => {
    render(<ProductCard product={mockProduct} />)

    const addButton = screen.getByRole('button', {
      name: /Add to cart/i,
    })
    fireEvent.click(addButton)

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('should increment product quantity in cart when increase button is clicked', async () => {
    mockCart = [
      {
        id: 1,
        name: 'Manzana Roja',
        price: 2000,
        quantity: 1,
        tax: 0.19,
        category: ProductCategory.FRESH_FRUITS,
        stock: 50,
      },
    ]

    render(<ProductCard product={mockProduct} />)

    const increaseButton = screen.getByRole('button', {
      name: /Increase quantity/i,
    })
    fireEvent.click(increaseButton)

    expect(mockAddToCart).toHaveBeenCalled()
  })

  it('should decrements product quantity in cart when decrease button is clicked', async () => {
    mockCart = [
      {
        id: 1,
        name: 'Manzana Roja',
        price: 2000,
        quantity: 5,
        tax: 0.19,
        category: ProductCategory.FRESH_FRUITS,
        stock: 50,
      },
    ]

    render(<ProductCard product={mockProduct} />)

    const decreaseButton = screen.getByRole('button', {
      name: /Decrease quantity/i,
    })
    fireEvent.click(decreaseButton)

    expect(mockRemoveFromCart).toHaveBeenCalled()
  })
})
