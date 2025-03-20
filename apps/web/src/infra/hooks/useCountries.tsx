import { Country } from '@/domain'
import { CountriesUseCase } from '@/infra/use-cases'
import { useState, useEffect } from 'react'

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCountries = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await CountriesUseCase.execute()

      setCountries(response)
    } catch (error) {
      console.error('Error fetching countries:', error)

      if (error instanceof Error) {
        setError(error.message)
      }

      setCountries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return {
    countries,
    loading,
    error,
  }
}
