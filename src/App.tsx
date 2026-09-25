import { useEffect, useState } from 'react'

import { UserCard } from './components/UserCard/UserCard'
import { getUsers } from './services/api'
import type { User } from './types/User'
import './App.scss'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [draw, setDraw] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getUsers(controller.signal)
      .then((data) => {
        setUsers(data)
        setError(null)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Couldn’t load anyone right now.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [draw])

  const shuffle = () => {
    setLoading(true)
    setError(null)
    setDraw((n) => n + 1)
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="brand">Passersby</p>
        <h1>Twelve strangers, pulled at random.</h1>
        <p className="lede">
          Tiny React exercise against the Random User API — refresh when you want a new crowd.
        </p>
        <button type="button" className="shuffle" onClick={shuffle} disabled={loading}>
          {loading ? 'Drawing…' : 'Shuffle faces'}
        </button>
      </header>

      {error && (
        <div className="banner" role="alert">
          <span>{error}</span>
          <button type="button" onClick={shuffle}>
            Try again
          </button>
        </div>
      )}

      {loading && users.length === 0 && <p className="status">Looking around…</p>}

      {users.length > 0 && (
        <section className={`grid${loading ? ' is-loading' : ''}`}>
          {users.map((user, index) => (
            <UserCard key={user.login.uuid} user={user} index={index} />
          ))}
        </section>
      )}
    </main>
  )
}

export default App
