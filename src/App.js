import * as React from 'react';

// Chakra UI
import {ChakraProvider} from '@chakra-ui/react';
import {Accordion, Box} from '@chakra-ui/react';

// seeti Components
import CoinVsUsdRow from './components/CoinVsUsdRow';
import NavBar from './components/NavBar';
import SplashScreen from './components/SplashScreen';
import CoinSearcher from './components/searcher/CoinSearcher';

import {UseFetch} from './hooks/UseFetch';

import './index.css';

// DRAG N DROP
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const App: () => React$Node = () => {
  //localStorage.removeItem("coin-list");
  const [coins, setCoins] = React.useState(
    JSON.parse(localStorage.getItem('coin-list')) === null
      ? ['bitcoin', 'ethereum']
      : JSON.parse(localStorage.getItem('coin-list')),
  );
  const {data} = UseFetch(
    `https://api.coingecko.com/api/v3/coins/list?include_platform=false`,
  );

  React.useEffect(() => {
    localStorage.setItem('all-coins', JSON.stringify(data));
  }, [data]);

  React.useEffect(() => {
    localStorage.setItem('coin-list', JSON.stringify(coins));
  });

  React.useEffect(() => {
    const data = localStorage.getItem('coin-list');
    if (data) {
      setCoins(JSON.parse(data));
    }
  }, []);

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(coins);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCoins(items);
  };

  const coinRows = coins.map((c, index) => {
    return (
      <Draggable key={c} draggableId={c} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <CoinVsUsdRow coin={c} />
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ChakraProvider>
          <SplashScreen />
          <NavBar />
          <Box ml="5" mr="5">
            <Droppable droppableId="coinsList">
              {provided => (
                <div
                  className="coinsList"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <Accordion
                    defaultIndex={[0]}
                    allowMultiple="true"
                    align="center">
                    {coinRows}
                  </Accordion>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Box>
          <CoinSearcher setCoins={setCoins} />
        </ChakraProvider>
      </DragDropContext>
    </>
  );
};

export default App;
