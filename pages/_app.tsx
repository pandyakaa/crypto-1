import App from 'next/app';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Component {...pageProps} />
            </>
        );
    }
}
