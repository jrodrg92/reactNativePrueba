import React, {useState} from 'react';

import {Modal, ModalOverlay, ModalContent} from '@chakra-ui/react';

import {IconButton, Flex, Spacer, useDisclosure} from '@chakra-ui/react';

import {AddIcon} from '@chakra-ui/icons';
import UseForm from '../../hooks/UseForm';

import CoinDataInsertForm from './CoinDataInsertForm';
import CoinSearcherList from './CoinSearcherList';

export default function CoinSearcher(props) {
  const {stateForm, handleInputChange, handleReset} = UseForm({buscador: ''});
  const [allCoins, setAllCoins] = useState([]);
  const [nextSelected, setNextSelected] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure({
    onClose: () => {
      handleReset({buscador: ''});
      setItemSelected('');
    },
  });

  const [itemSelected, setItemSelected] = useState('');

  // Get all available coins
  React.useEffect(() => {
    const data = localStorage.getItem('all-coins');
    if (data) {
      setAllCoins(JSON.parse(data));
    }
  }, []);

  return (
    <Flex pos="fixed" bottom="3" right="3">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="xl"
        scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          {!nextSelected ? (
            <CoinSearcherList
              stateForm={stateForm}
              onClose={onClose}
              setCoins={props.setCoins}
              itemSelected={itemSelected}
              setItemSelected={setItemSelected}
              allCoins={allCoins}
              handleInputChange={handleInputChange}
            />
          ) : (
            <CoinDataInsertForm onClose={onClose} />
          )}
        </ModalContent>
      </Modal>
      <Spacer />
      <IconButton
        variant="solid"
        colorScheme="red"
        fontSize="20px"
        isRound="true"
        _focus="none"
        icon={<AddIcon />}
        onClick={onOpen}
      />
    </Flex>
  );
}
