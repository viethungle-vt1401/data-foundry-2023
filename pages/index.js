import React, { useEffect, useState } from 'react';
import Profile from '@/pages/profile';
import DataTable from '@/components/data-table';
import Filters from '@/components/filters';
import Footer from '@/components/footer';
import '../styles/globals.css'
import SearchBar from '@/components/search-bar';
import SensitivityKey from '@/components/sensitivity-key';

export default function Home() {
  const [filters, setFilters] = useState({
    "filters": {
      "office": ["All"],
      "sensitivity": "All", 
      "request_process": "All",
      "request_form": "All",
      "frequency": "All"
    }})
  
  const [state, setState] = useState(Date.now())

  useEffect(() => {
    setState(Date.now());
  }, [filters])

  return (
    <div>
      <Profile />
      <div className="flex">
        <Filters setFilters={setFilters} />
        <div className="ml-auto mr-10">
          <SensitivityKey />
        </div>
      </div>
      <span key={state}>
        <DataTable filters={filters} />
      </span>
      <div className = "search-bar-container"> 
        <SearchBar />
        <div>SearchResults</div>
      </div>
      <Footer />
    </div>
  )
}