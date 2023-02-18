import React, { useEffect, useState } from 'react';
import routerContext from '../../context/routerContext';

type TRouterProps = {
  children: JSX.Element;
};

function Router({ children }: TRouterProps) {
  const [path, setPath] = useState(window.location.pathname);

  const contextValue = {
    path,
    changePath: (to: string) => {
      setPath(to);
    },
  };

  useEffect(() => {
    console.log('router', path);
  }, [path]);

  return <routerContext.Provider value={contextValue}>{children}</routerContext.Provider>;
}

export default Router;
