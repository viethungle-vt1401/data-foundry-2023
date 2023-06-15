import { useState, useEffect } from 'react';
import Link from 'next/link';
import Profile from './profile';
import React from 'react';

export default function MyData(){
    return (
        <div>
        <header>
        <div id="header-block">
            <img id = "logo" src = "/duke_wordmark_white.png" alt = "duke logo" height = {75} width = {200}/>
            <h1>Data Foundry</h1>
         </div >
        <div id="login-details">
            logged in as Ina! 
             <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
        </div>
            <h1>My Datasets</h1>
        </header>
        </div>
    )
}