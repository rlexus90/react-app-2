import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import NotFound from '../../ViewComponent/NotFound/NotFound';
import MoreInfo from '../../ViewComponent/Modal/MoreInfo';
import APIResponce from '../APIResponse';

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
            const data = APIResponce.getMovie(params.params.id);
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
