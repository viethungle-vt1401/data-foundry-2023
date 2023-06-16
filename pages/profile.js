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
    <main>
      <section id="database">
        <h2>Data Catalog</h2>
      </section>
    </main> 
    </div>

    
  )
}

