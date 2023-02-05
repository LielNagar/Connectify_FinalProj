import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ConnectionContextProvider from './components/ConnectionContext';
import LoginPage from './components/LoginPage';
import PostContextProvider from './components/PostContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConnectionContextProvider>
        <PostContextProvider>
            <App />
        </PostContextProvider>
    </ConnectionContextProvider>
);
