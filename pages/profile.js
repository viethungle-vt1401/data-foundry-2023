import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
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
      <header class="bg-duke-navy-blue">
        <div id="header-block">
          <img id = "logo" src = {data.photo} alt = "duke logo" height = {75} width = {200}/>
          <h1 class="text-white">Data Foundry</h1>
        </div >
        <div id="login-details" class="text-white">
          logged in as {data.name} 
          <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
        </div>
      </header>
      <nav class="bg-hatteras">
        <Link href="/" class="hover:text-duke-navy-blue">Database</Link>
        <Link href="/mydata" class="hover:text-duke-navy-blue">My Datasets</Link>
        <Link href="/documentation" class="hover:text-duke-navy-blue">Documentation</Link>
      </nav>
      <main>
        <section id="database">
          <h1>Data Catalog</h1>
        </section>
      </main> 
    </div>
  )
}