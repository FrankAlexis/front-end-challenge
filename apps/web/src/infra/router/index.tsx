import { CircularProgress } from '@mui/material'
import React, { Suspense, lazy } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useAuth } from '@/infra/hooks/useAuth'
import { Layout } from '@/interface/components'

const HomePage = lazy(() => import('@/interface/pages/Home'))
const ProductsPage = lazy(() => import('@/interface/pages/ProductsPage'))
const CheckoutPage = lazy(() => import('@/interface/pages/Checkout'))
const DashBoardPage = lazy(() => import('@/interface/pages/Dashboard'))
const LoginPage = lazy(() => import('@/interface/pages/Login'))

const AdminRoute = () => {
  const { canContinue } = useAuth()

  if (!canContinue) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<CircularProgress />}>{children}</Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <DashBoardPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/' replace />,
  },
])

export const AppRouter: React.FC = () => (
  <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
    <SuspenseWrapper>
      <RouterProvider router={router} />
    </SuspenseWrapper>
  </ErrorBoundary>
)
