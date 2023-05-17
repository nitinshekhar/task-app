import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TaskApp from '@/components/TaskApp';
import {Auth0ProviderWithNavigate} from '@/context/Auth0ProviderWithNavigate';
import '@/styles/app.css';

const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <TaskApp />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
