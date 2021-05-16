import React, {useState} from 'react';

import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

import {Input, Button} from '@chakra-ui/react';

import ListItems from '../ListItems';
import CoinSearcherHelper from '../../helpers/CoinSearcherHelper';

function CoinSearcherList(props) {
  const {
    onClose,
    itemSelected,
    setItemSelected,
    stateForm,
    allCoins,
    handleInputChange,
  } = props;
  const {buscador} = stateForm;
  const [foundCoins, setFoundCoins] = useState([]);

  CoinSearcherHelper({buscador, allCoins, setFoundCoins});
  const handleAdd = () => {
    props.setCoins(coin => [...coin, itemSelected]);
    setItemSelected('');
    onClose();
  };

  return (
    <>
      <ModalContent>
        <ModalHeader>Add Coin to the list</ModalHeader>
        <ModalCloseButton _focus="none" />
        <Input
          value={buscador}
          name="buscador"
          onChange={handleInputChange}
          placeholder="Coin name or symbol... (ex: bitcoin or btc)"
          size="2xl"
          width="95%"
          alignSelf="center"
          padding="2"
          autoComplete="off"
          autoFocus
        />
        <ListItems
          buscador={buscador}
          foundCoins={foundCoins}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
        />

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleAdd}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

export default CoinSearcherList;
