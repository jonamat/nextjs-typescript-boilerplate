export const RESTCOUNTRIES_API = 'https://restcountries.eu/rest/v2';
export const LOCAL_API = typeof window === 'undefined' ? 'http://localhost:3000/api' : location.host + '/api/';

export const restCountriesEndpoints = {
  getAllCountries: RESTCOUNTRIES_API + '/all',
  getCountryInfoByCountryCode: RESTCOUNTRIES_API + '/alpha',
};

export const localApiEndpoints = {
  countries: LOCAL_API + '/countries',
};
