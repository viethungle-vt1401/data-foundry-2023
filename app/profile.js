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
    <header>
      <div id="header-block">
        <img id = "logo" src = {data.img} alt = "duke logo" height = {75} width = {200}/>
        <h1>Data Foundry</h1>
      </div >
      <div id="login-details">
        logged in as {data.name} 
        <a href="https://groups.oit.duke.edu/Shibboleth.sso/Logout?return=https://shib.oit.duke.edu/cgi-bin/logout.pl"> log out</a>
      </div>
      <nav>
        <a href="#database">Database</a>
        <a href="#mydata">My Datasets</a>
        <a href="#documentation">Documentation</a>
      </nav>
    </header>
    
  
    
  

    
  )
}
