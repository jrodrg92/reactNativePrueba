import React from 'react';

import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

import {Button} from '@chakra-ui/react';

function CoinDataInsertForm(props) {
  const {onClose, itemSelected, setItemSelected} = props;

  const handleAdd = () => {
    props.setCoins(coin => [...coin, itemSelected]);
    setItemSelected('');
    onClose();
  };

  return (
    <>
      <ModalContent>
        <ModalHeader>Add your data</ModalHeader>
        <ModalCloseButton _focus="none" />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Back
          </Button>
          <Button variant="ghost" onClick={handleAdd}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

export default CoinDataInsertForm;
