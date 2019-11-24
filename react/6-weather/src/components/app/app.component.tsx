import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from "react-hot-loader/root";
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter } from "react-router-dom";

import { theme } from '../../services/theme/theme.service';
import { Header } from '../header/header.component';
import { MessageContainer } from '../../containers/message/message.container';
import { BodyRouterContainer } from '../../containers/router/body-router.container';
import { HeaderRouterContainer } from '../../containers/router/header-router.container';


export const AppComponent: React.FunctionComponent<{}> = hot(() => {
    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header>
                        <HeaderRouterContainer/>
                    </Header>
                    <BodyRouterContainer/>
                    <MessageContainer />
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
})

