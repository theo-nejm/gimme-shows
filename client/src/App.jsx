import React from 'react';
import { GlobalStyle } from './styles/global'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Bands} from "./pages/Bands";

export function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/bands' component={Bands} exact />
                    {/*<Route path='/events' component={Events} exact />*/}
                    <Route path='/login' component={Login} exact />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App;
