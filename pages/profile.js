import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../app/navbar'
import React from 'react'
 
export default function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
 
  useEffect(() => {
    setLoading(true)
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
    <header>
      <div id="header-block" style={headerStyle}>
        <img id = "logo" src = {data.img} alt = "duke logo" height = {75} width = {200}/>
        <h1>Data Foundry</h1>
      </div >
      <div id="login-details">
        logged in as {data.name} 
        <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
      </div>
    </header>
    <nav>
        <Link href="/">Database</Link>
        <Link href="/mydata">My Datasets</Link>
        <Link href="/documentation">Documentation</Link>
    </nav>
    <main>
      <section id="database">
        <h2>Data Catalog</h2>
      </section>
    </main> 
    </div>



    /* <div id="menu">
      <ul id="menu-options">
        <li>
          <Link><a href="/datafoundry/" className="active-tab">Data Catalog</a></Link>
        </li>
        <li>
          <Link><a href="/datafoundry/mydata/" className="active-tab">My Datasets</a></Link>
        </li>
        <li>
          <Link><a href="/datafoundry/documentation/" className="active-tab">Documentation</a></Link>
        </li>
      </ul>
    </div> */




    
    /* <main>
      <section id="database">
        <h2>Data Catalog</h2>
      </section>
      
    </main> 
    </div> */
  
    
  

    
  )
}

