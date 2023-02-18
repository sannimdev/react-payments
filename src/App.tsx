import React from 'react';
import { CardDetail } from './pages/card-detail';
import { CardEdit } from './pages/card-edit';
import { CardList } from './pages/card-list';
interface IRoutes {
  [key: string]: JSX.Element;
}

const routes: IRoutes = {
  '/card-detail': <CardDetail />,
  '/card-edit': <CardEdit />,
  '/card-add': <CardEdit />,
  '/': <CardList />,
};

function App() {
  const { pathname } = window.location || '';

  const path = '/' + pathname.substring(1).split('/')[0];

  return routes[path] ? routes[path] : <CardList />;
}

export default App;
