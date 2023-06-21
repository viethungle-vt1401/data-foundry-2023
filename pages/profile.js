import { useState, useEffect } from 'react'
import Link from 'next/link'
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
          <img id = "logo" src = {data.photo} alt = "duke logo" height = {100} width = {200}/>
          <h1 class="text-white px-3.5 font-thin">Data Foundry</h1>
        </div >
        <div id="login-details" class="text-white">
          logged in as {data.name} 
          <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
        </div>
      </header>
      <nav class="bg-hatteras px-2.5 py-2.5 font-sans text-sm font-bold">
          <Link href="/" class="text-duke-royal-blue hover:text-duke-royal-blue px-3.5">DATABASE</Link>
          <Link href="/mydata" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">MY DATASETS</Link>
          <Link href="/documentation" class="text-duke-navy-blue hover:text-duke-royal-blue px-3.5">DOCUMENTATION</Link>
      </nav>
      <main>
        <section id="database">
          <h1 class = "font-thin p-1">Data Catalog</h1>
        </section>
      </main> 
    </div>
  )
}