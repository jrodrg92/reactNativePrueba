import React, {useState, useEffect} from 'react';

import {Flex, Spacer, Box, Text} from '@chakra-ui/react';
import {Button, Heading} from '@chakra-ui/react';
import {useColorMode} from '@chakra-ui/react';

// ETH Gas icon
import {Icon} from '@chakra-ui/icons';
import {FaGasPump} from 'react-icons/fa';

// Light, Dark icons
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {UseFetch} from '../hooks/UseFetch';

// Etherscan.io API Token
// ASYQNKH8I3AG852RM5ER1WE7K6KG8XFVFD

export default function NavBar(props) {
  const apiToken = 'ASYQNKH8I3AG852RM5ER1WE7K6KG8XFVFD';
  const {colorMode, toggleColorMode} = useColorMode();
  const [gasPrice, setGas] = useState(null);

  const {data} = UseFetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiToken}`,
  );

  useEffect(() => {
    if (data != null) {
      setGas(data.result.FastGasPrice);
    }
  }, [data]);

  return (
    <Flex>
      <Box mt="2" ml="5">
        <Heading size="md">CryptoVIK</Heading>
      </Box>
      <Spacer />
      <Box mt="2">
        <Text colorScheme="pink" style={{fontVariant: 'small-caps'}}>
          <Icon as={FaGasPump} mr="2" />
          gas: {gasPrice} gwei
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Button onClick={toggleColorMode} variant="ghost" mr="3" _focus="none">
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
    </Flex>
  );
}
