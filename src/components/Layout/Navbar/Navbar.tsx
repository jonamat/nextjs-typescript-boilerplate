import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, IconButton, HStack, Heading, Tooltip, Text } from '@chakra-ui/react';
import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';

import Modal from '../Modal/Modal';

interface Props {
  showBack: boolean;
}

const Navbar: FC<Props> = ({ showBack }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleBack = () => router.back();
  const handleInfo = () => setModalOpen(true);

  return (
    <Flex justify="space-between" position="fixed" h="80px" w="100%" p={5} shadow="sm" bg="blue.100">
      {showBack && (
        <HStack flexGrow={0} spacing={5} mr={5}>
          <Tooltip hasArrow label="Go back">
            <IconButton colorScheme="blue" icon={<ArrowBackIcon />} onClick={handleBack} aria-label="go back" />
          </Tooltip>
        </HStack>
      )}

      <Flex flexGrow={1} align="center">
        <Heading size="lg" color="blackAlpha.800">
          NextJS boilerplate
        </Heading>
      </Flex>

      <HStack flexGrow={0} spacing={5} ml={5}>
        <Tooltip hasArrow label="About">
          <IconButton colorScheme="blue" icon={<InfoIcon />} onClick={handleInfo} aria-label="About" />
        </Tooltip>
      </HStack>

      <Modal
        open={modalOpen}
        handleClose={setModalOpen}
        isCentered
        title={'NextJS boilerplate'}
        content={<Text>Hello next!</Text>}
      />
    </Flex>
  );
};

export default Navbar;
