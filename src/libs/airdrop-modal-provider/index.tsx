import React, { ReactNode, useContext, useState } from 'react';

interface AirdropModalContextProps {
  showAirdropModal: boolean;
  setShowAirdropModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AidrdropModalProps {
  children: ReactNode;
}

const AirdropModalContextPropsContext = React.createContext({} as AirdropModalContextProps);
export const useAirdropModalContext = () =>
  useContext<AirdropModalContextProps>(AirdropModalContextPropsContext);

function Wrapper({ children }: AidrdropModalProps) {
  return <>{children}</>;
}
export function AirdropModalProvider({ children }: AidrdropModalProps) {
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  return (
    <AirdropModalContextPropsContext.Provider
      value={{
        showAirdropModal,
        setShowAirdropModal,
      }}
    >
      <Wrapper>{children}</Wrapper>
    </AirdropModalContextPropsContext.Provider>
  );
}
