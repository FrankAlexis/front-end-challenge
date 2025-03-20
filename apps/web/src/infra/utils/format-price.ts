export const formatPrice = (amount: number | string) => {
    if (typeof amount === 'string') {
        amount = parseFloat(amount)
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(amount)
}