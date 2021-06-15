import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Text, Heading, UnorderedList, ListItem, useBreakpointValue } from '@chakra-ui/react';

import { Country } from '@/interfaces';
import { getAllCountries } from '@/network/countries';
import { COUNTRY_DETAILS_PAGE } from '@/routing';
import Page from '@/components/Layout/Page/Page';

interface Props {
  countries: Array<Country>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const countries = await getAllCountries();

  return {
    props: {
      countries,
      ...(locale && (await serverSideTranslations(locale))),
    },
  };
};

const Countries: FC<Props> = ({ countries }) => {
  const { t } = useTranslation();
  const columnCount = useBreakpointValue({
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });

  return (
    <Page>
      <Heading mb={5} size="lg">
        {t('List of countries')}
      </Heading>
      <UnorderedList m={0} spacing={3} listStyleType="none" sx={{ columnCount }}>
        {countries.map((country, index) => (
          <ListItem key={index} cursor="pointer">
            <Link href={COUNTRY_DETAILS_PAGE + country.alpha3Code}>
              <Text _hover={{ color: 'blue.500' }}>{country.name}</Text>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Page>
  );
};

export default Countries;
