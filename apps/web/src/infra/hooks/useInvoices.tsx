import { useMemo } from 'react'
import { useCart } from '@/infra/hooks'

export const useInvoices = () => {
  const { invoices, ...props } = useCart()

  const sortedInvoices = useMemo(
    () =>
      invoices.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [invoices]
  )

  return {
    invoices: sortedInvoices,
    ...props,
  }
}
