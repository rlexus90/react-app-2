import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import NotFound from '../../ViewComponent/NotFound/NotFound';
import MoreInfo from '../../ViewComponent/Modal/MoreInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ':id',
        element: <MoreInfo />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
