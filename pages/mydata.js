import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
import '../styles/globals.css';

export default function MyData(){
    const [data, setData] = useState(null)
   
    useEffect(() => {
      fetch('/api')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
    }, [])
   
    if (!data) return <p>No profile data</p>
   
    return (
      <div>
      <header class="bg-duke-navy-blue">
        <div id="header-block">
          <img id = "logo" src = {data.photo} alt = "duke logo" height = {75} width = {200}/>
          <h1 class="text-white px-3.5 font-thin">Data Foundry</h1>
        </div >
        <div id="login-details" class="text-white">
          logged in as {data.name} 
          <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
        </div>
      </header>
      <nav>
        <Link href="/" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">DATABASE</Link>
        <Link href="/mydata" class="text-duke-royal-blue hover:text-duke-royal-blue px-3.5">MY DATASETS</Link>
        <Link href="/documentation" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">DOCUMENTATION</Link>
      </nav>
        <div>
            <h1>My Datasets</h1>
        </div>
      </div>
    )
}