export interface Country {
  name: string;
  code: string;
  region: string;
}

export interface CountryResponse {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  region: string;
}
