import { useState, useEffect } from 'react'
import Image from 'next/image'
 
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
      <div id="header-block">
        <img id = "logo" src = {data.img} alt = "duke logo" height = {75} width = {200}/>
        <h1>Data Foundry</h1>
      </div >
      <div id="login-details">
        logged in as {data.name} 
        <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
      </div>
    </header>
    <div id="menu">
      <ul id="menu-options">
        <li>
          <a href="/datafoundry/" class="active-tab">Data Catalog</a>
        </li>
        <li>
          <a href="/datafoundry/mydata/" class="active-tab">My Datasets</a>
        </li>
        <li>
          <a href="/datafoundry/documentation/" class="active-tab">Documentation</a>
        </li>
      </ul>
    </div>




    {/* <nav>
        <a href="#database">Database</a>
        <a href="#mydata">My Datasets</a>
        <a href="#documentation">Documentation</a>
      </nav>
    <main>
      <section id="database">
        <h2>Data Catalog</h2>
      </section>
      
    </main> */}
    </div>
  
    
  

    
  )
}
