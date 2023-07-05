import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
import { App } from './App';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import './normalize.css'
import { LoginPage } from './LoginPage';
import { Users } from './Pages/Users/Users';
import { Products } from './Pages/Products/Products';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'products',
        element: <Products />
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const supabaseUrl = import.meta.env.VITE_PROJECT_URL_SUPABASE
const supabaseKey = import.meta.env.VITE_API_KEY_SUPABASE
export const supabase = createClient(supabaseUrl, supabaseKey)

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <RouterProvider router={router} />
);