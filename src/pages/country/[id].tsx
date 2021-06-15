import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Heading, Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Country } from '@/interfaces';
import { getAllCountries, getCountryInfoByCountryCode } from '@/network/countries';
import Page from '@/components/Layout/Page/Page';

interface Props {
  countryData: Country;
}

type Paths = Array<string | { params: { id: string }; locale?: string }>;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const countries = await getAllCountries();

  const paths = countries.reduce<Paths>((prev, next) => {
    const params = { id: next.alpha3Code };

    if (locales?.length) {
      locales?.forEach((locale) => prev.push({ params, locale }));
    } else {
      prev.push({ params });
    }

    return prev;
  }, []);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  if (!params || typeof params.id !== 'string') throw new Error('params.id must be a string');

  const countryData = await getCountryInfoByCountryCode(params.id);

  return {
    props: {
      countryData,
      ...(locale && (await serverSideTranslations(locale))),
    },
  };
};

const CountryDetails: FC<Props> = ({ countryData }) => {
  const { t } = useTranslation();
  return (
    <Page showBack>
      <Heading>{countryData.name}</Heading>

      <Box my={4}>
        <Text>
          <strong>{t('Region')}:</strong> {countryData.region}
        </Text>
        <Text>
          <strong>{t('Subregion')}:</strong> {countryData.subregion}
        </Text>
        <Text>
          <strong>{t('Capital')}:</strong> {countryData.capital}
        </Text>
        <Text>
          <strong>{t('Population')}:</strong> {countryData.population}
        </Text>
      </Box>
    </Page>
  );
};

export default CountryDetails;
