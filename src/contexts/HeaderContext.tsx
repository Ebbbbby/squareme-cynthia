'use client'

import React, { createContext, useContext, useState } from "react";

type HeaderContextType = {
  isHeaderVisible: boolean;
  setIsHeaderVisible: (visible: boolean) => void;
};

const HeaderContext = createContext<HeaderContextType>({
  isHeaderVisible: true,
  setIsHeaderVisible: () => {},
});

export const useHeader = () => useContext(HeaderContext);

type HeaderProviderProps = {
  children: React.ReactNode;
};

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  return (
    <HeaderContext.Provider value={{ isHeaderVisible, setIsHeaderVisible }}>
      {children}
    </HeaderContext.Provider>
  );
};
