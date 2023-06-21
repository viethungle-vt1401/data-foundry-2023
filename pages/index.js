import React, { useEffect, useState } from 'react';
import Profile from '../pages/profile';
import DataTable from '../components/data-table';
import Filters from '../components/filters';
import '../styles/globals.css'

export default function Home() {
  const [filters, setFilters] = useState({"filters": {"sensitivity": "Public", "request_process": "True"}})
  const [state, setState] = useState(Date.now())

  useEffect(() => {
    setState(Date.now());
  }, [filters])

  return (
    <div>
      <Profile />
      <Filters setFilters={setFilters} />
      <span key={state}>
      <DataTable filters={filters} />
      </span>
    </div>
  )
}