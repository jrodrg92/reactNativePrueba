import React from 'react';

import {List, ModalBody, Collapse} from '@chakra-ui/react';

import CoinListItem from './searcher/CoinListItem';

import '../App.css';

function ListItems(props) {
  const {buscador, foundCoins, itemSelected, setItemSelected} = props;

  // Generate a list item for each found coin
  const listCoins = foundCoins.map(c => {
    return (
      <CoinListItem
        c={c}
        key={c.id}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
    );
  });

  return (
    <>
      <ModalBody className="listItems">
        <Collapse in={buscador.length > 2} animateOpacity>
          <List spacing={3} mt={2}>
            {listCoins}
          </List>
        </Collapse>
      </ModalBody>
    </>
  );
}

export default ListItems;
