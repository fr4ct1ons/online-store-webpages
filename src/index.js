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
  }
])


class UserManager {
  async createUser(name, password) {
    return fetch('http://localhost:5029/User/CreateUser', {
      method: "POST",
      body: JSON.stringify({
        'name': name,
        'password': password,
      }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem creating an user:', error);
      });
  }
  async runEverything() {
    await this.createUser('marco', '1234')
    var id = await this.login('marco', '1234');
    console.log(id);
    await this.deleteUser(id['id']);
  }
  async deleteUser(userId) {
    return fetch('http://localhost:5029/User/DeleteUser?' +  'userId='+userId, {
      method: "DELETE",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('There was a problem creating an user:', error);
      });
  }


  async login(name, password) {
    return fetch('http://localhost:5029/User/LoginUser', {
      method: "POST",
      body: JSON.stringify({
        'username': name,
        'password': password,
      }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(response => {
        return response;
      })
      .catch(error => {
        console.error('There was a problem logging in:', error);
      });


  }
}
var mng = new UserManager().runEverything();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
