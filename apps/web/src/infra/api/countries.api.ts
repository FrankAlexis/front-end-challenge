import { Country, CountryResponse } from "@/domain"

export const CountryApi = {
    getCountries: async (): Promise<Country[]> => {
        if (!import.meta.env.VITE_COUNTRIES_API_URL) {
            throw new Error('Countries API URL is not defined')
        }
        const response = await fetch(
            import.meta.env.VITE_COUNTRIES_API_URL
        )
        if (!response.ok) {
            throw new Error('Failed to fetch countries')
        }
        const data = await response.json() as CountryResponse[]
        return data.map(country => ({
            name: country.name.common,
            code: country.cca2,
            region: country.region,
        }))
    },
}