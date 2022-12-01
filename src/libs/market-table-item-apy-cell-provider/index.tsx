import { IncentivesController } from '@pret/contract-helpers';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { getNetworkConfig, getProvider } from '../../helpers/config/markets-and-network-config';
import { useProtocolDataContext } from '../protocol-data-provider';

interface MarketTableItemAPYCellContextProps {
  showMarketTableItemAPYCell: boolean;
  setShowMarketTableItemAPYCell: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MarketTableItemAPYCellProps {
  children: ReactNode;
}

const MarketTableItemAPYCellContext = React.createContext({} as MarketTableItemAPYCellContextProps);
export const useMarketTableItemAPYCellContext = () => useContext(MarketTableItemAPYCellContext);

function Wrapper({ children }: MarketTableItemAPYCellProps) {
  const { currentMarketData } = useProtocolDataContext();

  const incentivesTxBuilder = new IncentivesController(getProvider(currentMarketData.chainId));
  const { addresses } = getNetworkConfig(currentMarketData.chainId);
  const incentivesControllerAddress = addresses.incentiveControllers?.corn;
  const { setShowMarketTableItemAPYCell } = useMarketTableItemAPYCellContext();
  useEffect(() => {
    (async function () {
      if (!incentivesControllerAddress) return;
      const distributionEnd = await incentivesTxBuilder.DISTRIBUTION_END({
        incentivesControllerAddress,
      });
      const distributionEndTimestamp = Number(distributionEnd.toString());
      const nowTimestamp = Math.floor(Date.now() / 1000);
      if (distributionEndTimestamp > nowTimestamp) setShowMarketTableItemAPYCell(true);
    })();
  }, []);
  return <>{children}</>;
}
export function MarketTableItemAPYCellProvider({ children }: MarketTableItemAPYCellProps) {
  const [showMarketTableItemAPYCell, setShowMarketTableItemAPYCell] = useState(false);
  return (
    <MarketTableItemAPYCellContext.Provider
      value={{
        showMarketTableItemAPYCell,
        setShowMarketTableItemAPYCell,
      }}
    >
      <Wrapper>{children}</Wrapper>
    </MarketTableItemAPYCellContext.Provider>
  );
}
