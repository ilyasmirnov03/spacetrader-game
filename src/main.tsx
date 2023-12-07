import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { Login } from './components/login/root/Login.tsx';
import { Dashboard } from './components/dashboard/root/Dashboard.tsx';
import { Ships } from './components/dashboard/ships/Ships.tsx';
import environment from './constants/environment.const.ts';
import { LocalStorageEnum } from './enum/local-storage.enum.ts';
import {Ship} from './components/dashboard/ships/ship/Ship.tsx';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowRightFromBracket, faChartSimple, faRocket} from '@fortawesome/free-solid-svg-icons';

// Init environment
const loginToken = localStorage.getItem(LocalStorageEnum.LOGIN_KEY);
environment.loginToken = loginToken ?? '';

// Init icons
library.add(faRocket, faChartSimple, faArrowRightFromBracket);

// Router setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/ships',
        element: <Ships></Ships>,
      },
      {
        path: '/ships/:shipId',
        element: <Ship></Ship>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
