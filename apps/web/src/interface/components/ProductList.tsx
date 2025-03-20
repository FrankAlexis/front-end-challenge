import { useCart } from '@/infra/hooks'
import { ProductCard } from '@/interface/components'

export const ProductList: React.FC = () => {
  const { products } = useCart()

  return (
    <div className='flex flex-wrap items-center justify-center w-full max-w-7xl p-4 gap-9'>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
