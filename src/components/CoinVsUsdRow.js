import React, {useState, useEffect} from 'react';

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';

import {Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';

import {useColorModeValue} from '@chakra-ui/react';

import {Box, Text, Image} from '@chakra-ui/react';
import {CircularProgress} from '@chakra-ui/react';
import {Flex, Spacer} from '@chakra-ui/react';
import {UseFetch} from '../hooks/UseFetch';

export default function CoinVsUsdRow(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [items, setItems] = useState(null);

  const coinName = useColorModeValue(
    'linear(to-r,blue.300,blue.500)',
    'linear(to-r, yellow.200,yellow.500)',
  );

  const {data, isLoaded: isLoadedCrypto} = UseFetch(
    `https://api.coingecko.com/api/v3/coins/${props.coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
  );

  useEffect(() => {
    if (data != null) {
      setItems(data);
      setLoaded(isLoadedCrypto);
      setError(null);
    }
  }, [data, isLoadedCrypto]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Flex>
        <CircularProgress isIndeterminate color="green.300" />
        <Spacer />
        <Text
          bgGradient={coinName}
          bgClip="text"
          fontSize="xl"
          fontWeight="extrabold"
          style={{fontVariant: 'small-caps'}}>
          Loading {props.coin}
        </Text>
      </Flex>
    );
  } else {
    return (
      <AccordionItem>
        <AccordionButton _focus="none">
          <Flex w="100%">
            <Box w="5%" align="center">
              <Image src={items.image.thumb} alt={items.id} mt={1} />
            </Box>
            <Spacer />
            <Box w="15%" textAlign="left" verticalAlign="middle">
              <Text
                bgGradient={coinName}
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
                style={{fontVariant: 'small-caps'}}>
                {items.id}
              </Text>
            </Box>
            <Spacer />
            <Box w="75%" textAlign="left">
              <Text
                bgGradient="linear(to-r, blue.500,yellow.500)"
                bgClip="text"
                fontSize="xl"
                style={{fontVariant: 'small-caps'}}>
                {items.market_data.current_price.usd} $
              </Text>
            </Box>
            <Spacer />
            <Box w="5%" textAlign="right">
              <AccordionIcon />
            </Box>
          </Flex>
        </AccordionButton>
        <AccordionPanel pb={4}>
          <StatGroup>
            <Stat>
              <StatLabel>24h</StatLabel>
              <StatNumber>
                {items.market_data.price_change_24h_in_currency.usd.toFixed(2)}$
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    items.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {items.market_data.price_change_percentage_24h.toFixed(2)}%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>7d</StatLabel>
              <StatHelpText>
                <StatArrow
                  type={
                    items.market_data.price_change_percentage_7d > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {items.market_data.price_change_percentage_7d.toFixed(2)}%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>30d</StatLabel>
              <StatHelpText>
                <StatArrow
                  type={
                    items.market_data.price_change_percentage_30d > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {items.market_data.price_change_percentage_30d.toFixed(2)}%
              </StatHelpText>
            </Stat>

            <Box width="1%">
              <Menu isLazy w='"10"'>
                <MenuButton>...</MenuButton>
                <MenuList>
                  {/* MenuItems are not rendered unless Menu is open */}
                  <MenuItem w='"10"'>Edit</MenuItem>
                  <MenuItem w='"10"'>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </StatGroup>
        </AccordionPanel>
      </AccordionItem>
    );
  }
}
