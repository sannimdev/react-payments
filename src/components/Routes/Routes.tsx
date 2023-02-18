export { default as Routes } from './Routes';
import React, { useContext } from 'react';
import routerContext from '../../context/routerContext';
import { CardDetail } from '../../pages/card-detail';
import { CardEdit } from '../../pages/card-edit';
import { CardList } from '../../pages/card-list';

interface IRoutes {
  [key: string]: JSX.Element;
}

const routes: IRoutes = {
  '/card-detail': <CardDetail />,
  '/card-edit': <CardEdit />,
  '/card-add': <CardEdit />,
  '/': <CardList />,
};

function Routes() {
  const { path, changePath } = useContext(routerContext);

  return routes[path] ? routes[path] : <CardList />;
}

export default Routes;
