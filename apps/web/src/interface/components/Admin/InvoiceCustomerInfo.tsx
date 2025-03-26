import type { ShippingFormData } from 'src/domain'

interface InvoiceCustomerInfoProps {
  shippingInfo: ShippingFormData
}

export const InvoiceCustomerInfo = ({
  shippingInfo,
}: InvoiceCustomerInfoProps) => {
  return (
    <div className='space-y-1'>
      <h4 className='text-lg font-semibold'>Client</h4>
      <hr className='border-t border-gray-300' />
      <div className='text-left'>
        <p className='text-base font-medium '>{shippingInfo.name}</p>
        <p className='text-sm '>{shippingInfo.email}</p>
        <p className='text-sm '>{shippingInfo.phone}</p>
        <p className='text-sm'>{shippingInfo.country}</p>
      </div>
    </div>
  )
}
