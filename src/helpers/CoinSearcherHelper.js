import {useEffect} from 'react';

function CoinSearcherHelper(props) {
  const {buscador, allCoins, setFoundCoins} = props;

  useEffect(() => {
    let newFoundCoins = [];

    if (buscador.length >= 3) {
      if (buscador.charAt(0) === '#') {
        if (buscador.charAt(1) === '{') {
          newFoundCoins = allCoins.filter(
            coin =>
              coin.symbol.toLowerCase() ===
              buscador.substring(2, buscador.length - 1).toLowerCase(),
          );
        } else {
          newFoundCoins = allCoins.filter(coin =>
            coin.symbol
              .toLowerCase()
              .includes(buscador.substring(1, buscador.length).toLowerCase()),
          );
        }
      } else {
        newFoundCoins = allCoins.filter(coin =>
          coin.name.toLowerCase().includes(buscador),
        );
      }

      setFoundCoins(newFoundCoins);
    }
  }, [buscador, allCoins, setFoundCoins]);
}

export default CoinSearcherHelper;
