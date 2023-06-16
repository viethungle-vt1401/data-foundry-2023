import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
import '../app/styles/globals.css';

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
      <header className="bg-duke-navy-blue">
        <div id="header-block">
          <img id = "logo" src = {data.photo} alt = "duke logo" height = {75} width = {200}/>
          <h1 className="text-white">Data Foundry</h1>
        </div >
        <div id="login-details" className="text-white">
          logged in as {data.name} 
          <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
        </div>
      </header>
      <nav>
          <Link href="/">Database</Link>
          <Link href="/mydata">My Datasets</Link>
          <Link href="/documentation">Documentation</Link>
      </nav>
      </div>
  
    )
}