import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from "./app/Store"
//-------------
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/md-dark-indigo/theme.css"
import "primeflex/primeflex.css"
import "primereact/resources/primereact.css"
import 'primeicons/primeicons.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* --------- */}
    <PrimeReactProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);


