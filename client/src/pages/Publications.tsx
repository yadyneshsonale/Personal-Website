import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Pub = {
  id: string
  title: string
  venue: string
  year: number
  link?: string
  image?: string
  abstract?: string
  repo?: string
}

export default function Publications() {
  const [items, setItems] = useState<Pub[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<Pub[]>('http://localhost:4000/api/publications').then((r) => setItems(r.data)).catch(() => {})
  }, [])

  return (
    <section className="grid-page">
      <h2>Publications</h2>
      <div className="grid">
        {items.map((p) => {
          const excerpt = (s?: string, n = 200) => (s && s.length > n ? s.slice(0, n) + '…' : s)
          return (
            <article
              key={p.id}
              className="card pub-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/publications/${p.id}`)}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/publications/${p.id}`) }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-media" style={{ backgroundImage: `url(${p.image})` }} />
              <div className="card-body">
                <h3>{p.title}</h3>
                <p className="muted">{p.venue} · {p.year}</p>
                <p>{excerpt(p.abstract)}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="btn">Read</a>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
