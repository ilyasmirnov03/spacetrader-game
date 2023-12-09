import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx';
import {Login} from './components/login/root/Login.tsx';
import {Dashboard} from './components/dashboard/root/Dashboard.tsx';
import {Ships} from './components/dashboard/ships/Ships.tsx';
import {Ship} from './components/dashboard/ships/ship/Ship.tsx';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowRightFromBracket, faChartSimple, faRocket} from '@fortawesome/free-solid-svg-icons';
import {AuthContextProvider} from './providers/auth/AuthContextProvider.tsx';

// Init icons
library.add(faRocket, faChartSimple, faArrowRightFromBracket);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="login" element={<Login/>}></Route>
                    <Route path="/" element={<App/>}>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                        <Route path="/ships" element={<Ships/>}></Route>
                        <Route path="/ships/:shipId" element={<Ship/>}></Route>
                    </Route>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
