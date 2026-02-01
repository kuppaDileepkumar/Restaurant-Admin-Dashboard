// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react'

const SearchBar = ({ onSearch, delay = 300 }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query)
    }, delay)

    return () => clearTimeout(handler)
  }, [query, delay, onSearch])

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search menu..."
      className="border px-2 py-1 rounded"
    />
  )
}

export default SearchBar
