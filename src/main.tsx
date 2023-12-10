import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx';
import {Login} from './components/login/root/Login.tsx';
import {Dashboard} from './components/dashboard/root/Dashboard.tsx';
import {Ships} from './components/dashboard/ships/Ships.tsx';
import {ShipDetails} from './components/dashboard/ship-details/ShipDetails.tsx';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faAnchor,
    faAnglesRight,
    faArrowRightFromBracket,
    faChartSimple, faCoins, faGasPump,
    faRocket, faSatellite
} from '@fortawesome/free-solid-svg-icons';
import {AuthContextProvider} from './providers/auth/AuthContextProvider.tsx';
import {ShipContextProvider} from './providers/ship/ShipContextProvider.tsx';

// Init icons
library.add(faRocket, faChartSimple, faArrowRightFromBracket, faAnchor, faAnglesRight, faSatellite, faCoins, faGasPump);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="login" element={<Login/>}></Route>
                    <Route path="/" element={<App/>}>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                        <Route path="/ships" element={<Ships/>}></Route>
                        <Route path="/ships/:shipId" element={
                            <ShipContextProvider>
                                <ShipDetails></ShipDetails>
                            </ShipContextProvider>
                        }></Route>
                    </Route>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
