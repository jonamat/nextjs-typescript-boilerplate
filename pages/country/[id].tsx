import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { useQuery } from "react-query";
import { Country } from "../../interfaces";

interface Props {
  countryData: Country;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries: Array<Country> = (
    await axios.get("https://restcountries.eu/rest/v2/all")
  ).data;

  let paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }))

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) throw new Error();

  const countryData = (
    await axios.get(`
    https://restcountries.eu/rest/v2/alpha/${params.id}`)
  ).data;

  return {
    props: {
      countryData,
    },
  };
};

const CountryDetails: FC<Props> = ({ countryData }) => {
   const fetched = useQuery('test', )

  return (
    <>
      <h1>{countryData.name}</h1>
      <div>{countryData.region}</div>
      <div>{countryData.capital}</div>
      <div></div>
    </>
  );
};

export default CountryDetails;
