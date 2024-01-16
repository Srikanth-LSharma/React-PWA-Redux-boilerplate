/* eslint-disable import/no-named-as-default */
import React from 'react';
// import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import urls from './constants/routes.json';
import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';

function AppRouter() {
    console.log("Test commit for github push");
    return (
        <Routes>
            <Route exact path={urls?.HOME} element={<Home />} />
            <Route exact path={urls?.ABOUT} element={<About />} />
            <Route exact path={urls?.CONTACT} element={<Contact />} />
        </Routes>
    )
}

AppRouter.propTypes = {};

export default AppRouter;
