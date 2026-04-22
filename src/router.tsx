import { createBrowserRouter } from 'react-router';
import FormPersonal from './pages/FormPersonal';
import FormAddress from '@/pages/FormAddress';
import FormLoan from './pages/FormLoan';
import MainLayout from './layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <FormPersonal />,
      },
      {
        path: '/address',
        element: <FormAddress />,
      },
      {
        path: '/loan',
        element: <FormLoan />,
      },
    ],
  },
]);
