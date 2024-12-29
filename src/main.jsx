import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatContextProvider } from './contextApi/ChatContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contextApi/authContext.jsx';
import { DarkThemeContextProvider } from './contextApi/DarkTheme.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatContextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <DarkThemeContextProvider>

            <App />
          </DarkThemeContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ChatContextProvider >
  </React.StrictMode>
);

