import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import NotFound from '../NotFound/NotFound';
import MoreInfo from '../Modal/MoreInfo';
import APIResponce from '../controller/APIResponse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ':id',
        element: <MoreInfo />,
        loader: (params) => {
          if (params.params.id) {
            const data = APIResponce.getShip(params.params.id);
            return data;
          }
          return null;
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
