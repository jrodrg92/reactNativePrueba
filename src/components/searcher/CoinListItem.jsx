import React from 'react';

import {ListItem, ListIcon, HStack, Text} from '@chakra-ui/react';

import {RiCheckboxCircleFill} from 'react-icons/ri';

function CoinListItem(props) {
  const {c, setItemSelected, itemSelected} = props;

  const handleClick = (id, e) => {
    if (itemSelected && itemSelected === id) {
      setItemSelected('');
    } else {
      setItemSelected(id);
    }
  };

  return (
    <ListItem
      key={c.id}
      cursor="pointer"
      onClickCapture={e => handleClick(c.id, e)}>
      <HStack>
        {itemSelected === c.id ? (
          <ListIcon as={RiCheckboxCircleFill} color="green.500" />
        ) : (
          <ListIcon as={RiCheckboxCircleFill} color="red.200" />
        )}
        <Text w="30%">{c.symbol.toUpperCase()}</Text>
        <Text w="70%">{c.name}</Text>
      </HStack>
    </ListItem>
  );
}

export default CoinListItem;
