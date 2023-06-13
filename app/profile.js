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
      <Image src = {data.img} alt = "duke logo" height = {75} width = {200}/>
      <h1>hello, {data.name}!</h1>
      <h1>{data.message}</h1>
    </div>
  )
}
