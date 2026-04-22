import { createRoot } from 'react-dom/client';
import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './QueryClient.tsx';

import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
