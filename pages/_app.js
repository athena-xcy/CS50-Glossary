import App from 'next/app';
import React from 'react';
import { configure } from 'mobx';
import { withMobx } from 'next-mobx-wrapper';
import { Provider, useStaticRendering } from 'mobx-react';
import * as getStores from '../stores';

const isServer = !process.browser;

configure({enforceActions: 'observed'});
useStaticRendering(isServer); // NOT `true` value

class MyApp extends App {
    render() {
        const { Component, pageProps, store } = this.props;
        console.log(store);
        return (
            <Provider {...store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}
export default withMobx(getStores)(MyApp);