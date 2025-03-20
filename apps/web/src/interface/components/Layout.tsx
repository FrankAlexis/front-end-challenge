import { Header } from '@/interface/components'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />
      <main className='min-h-min flex-grow bg-gray-100 py-3'>
        <Outlet />
      </main>
      <footer className='bg-gray-200 relative w-full text-gray-500 text-center p-4'>
        © {new Date().getFullYear()} Online Store
      </footer>
    </div>
  )
}
