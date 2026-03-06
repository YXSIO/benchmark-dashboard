import { useState, useEffect } from 'react'
import type { BenchmarkData } from './types/benchmark'
import { BenchmarkTable } from './components/BenchmarkTable/BenchmarkTable'

function App() {
  const [data, setData] = useState<BenchmarkData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}benchmark-data.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load data: ${res.status}`)
        return res.json()
      })
      .then((json: BenchmarkData) => {
        setData(json)
        setError(null)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load benchmark data')
        setData(null)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="app app--loading">
        <p>Loading benchmark data…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app app--error">
        <p>{error}</p>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="app">
      <h1 className="app__title">Embedding Benchmark English</h1>
      <BenchmarkTable data={data} />
    </div>
  )
}

export default App
