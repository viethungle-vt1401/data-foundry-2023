import React, { useEffect, useState } from 'react';
import Profile from '../components/profile';
import DataTable from '../components/data-table';
import Filters from '../components/filters';
import '../styles/globals.css'

export default function Home() {
  const [filters, setFilters] = useState({"filters": {"sensitivity": "Public", "request_process": "True"}})
  const [state, setState] = useState(Date.now())

  useEffect(() => {
    setState(Date.now());
    // do a console log to see what value so i can change
  }, [filters])

  return (
    <div>
      <Profile />
      <span key={state}>
        <DataTable filters={filters} />
      </span>
      <Filters setFilters={setFilters} />
    </div>
  )
}