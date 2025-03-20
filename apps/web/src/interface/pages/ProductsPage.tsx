import { ProductList } from '@/interface/components'

const ProductsPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h3 className='text-4xl font-bold text-gray-900 mt-3'>Product Catalog</h3>
      <ProductList />
    </div>
  )
}

export default ProductsPage
