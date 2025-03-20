import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ShippingForm } from '../ShippingForm'
import userEvent from '@testing-library/user-event'

jest.mock('@hooks', () => ({
  useCountries: () => ({
    countries: [
      { cca2: 'US', name: 'United States' },
      { cca2: 'CA', name: 'Canada' },
      { cca2: 'MX', name: 'Mexico' },
      { cca2: 'ES', name: 'Spain' },
    ],
  }),
}))

describe('ShippingForm component', () => {
  const mockOnSubmit = jest.fn()
  it('renders form with all required fields ', () => {
    render(<ShippingForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sent/i })).toBeDisabled()
  })

  it('enables submit button when all fields are valid', async () => {
    const user = userEvent.setup()
    render(<ShippingForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText(/name/i), 'example name')
    await user.type(screen.getByLabelText(/email/i), 'example@gmail.com')
    await user.type(screen.getByLabelText(/phone/i), '300850002')

    const countrySelect = screen.getByLabelText(/country/i)
    fireEvent.mouseDown(countrySelect)

    await waitFor(() => {
      const mexicoOption = screen.getByText('Mexico')
      fireEvent.click(mexicoOption)
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sent/i })).toBeEnabled()
    })
  })
})
