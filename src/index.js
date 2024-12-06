import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFound from './pages/NotFound';
import Storefront from './pages/Storefront';
import UserFront from './pages/Userfront';
import StoreSearch from './pages/StoreSearch.jsx';
import { CartProvider } from './helpers/cart.js';
import CartFront from './pages/CartFront.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: "/storefront",
    element: <Storefront />
  },
  {
    path: "/user",
    element: <UserFront />
  },
  {
    path: "/cart",
    element: <CartFront/>
  },
  {
    path: "/store_search/:query",
    element: <StoreSearch />
  }
])



//let mng = new UserManager().runEverything();
//let storemng = new StoreManager().runEverything();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
