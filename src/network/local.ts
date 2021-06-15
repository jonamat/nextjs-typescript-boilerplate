import axios from 'axios';

import { Country } from '../interfaces';
import { localApiEndpoints } from './config';

/**
 * Get a list of countries
 * @returns Array of Country objects
 */
export const getAllCountries = async () => {
  return (await axios.get<Array<Country>>(localApiEndpoints.countries)).data;
};

/**
 * Get info for a specific country
 * @param alpha3code 3-digit country code
 * @returns A Country object
 */
export const getCountryInfoByCountryCode = async (alpha3code: string) => {
  return (await axios.get<Country>(localApiEndpoints.countries + `/${alpha3code}`)).data;
};
