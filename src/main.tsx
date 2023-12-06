import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { Login } from './components/login/root/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: []
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
