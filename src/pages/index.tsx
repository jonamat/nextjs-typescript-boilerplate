import { FC } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Flex, Heading, Center } from '@chakra-ui/react';
import { COUNTRIES_PAGE } from '@/routing';

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <Center h="100vh">
      <Flex p="10" direction="column" align="center" justify="center">
        <Heading mb={10}>{t('NextJS boilerplate')}</Heading>
        <Link href={COUNTRIES_PAGE}>
          <Button colorScheme="blue">{t('Go to countries page')}</Button>
        </Link>
      </Flex>
    </Center>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale))),
    },
  };
};

export default Home;
