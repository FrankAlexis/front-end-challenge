import { Country } from "@/domain";
import { CountryApi } from "@/infra/api";

export class CountriesUseCase {
    static async execute(): Promise<Country[]> {
        return await CountryApi.getCountries();
    }
}
