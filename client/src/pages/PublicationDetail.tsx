import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

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

export default function PublicationDetail() {
  const { id } = useParams()
  const [pub, setPub] = useState<Pub | null>(null)

  useEffect(() => {
    if (!id) return
    axios
      .get<Pub[]>('http://localhost:4000/api/publications')
      .then((r) => setPub(r.data.find((p) => p.id === id) || null))
      .catch(() => {})
  }, [id])

  if (!pub) return (
    <section className="grid-page">
      <p>Loading…</p>
    </section>
  )

  return (
    <section className="grid-page">
      <article className="card pub-detail">
        {pub.image && <div className="card-media" style={{ backgroundImage: `url(${pub.image})`, minHeight: 220 }} />}
        <div className="card-body">
          <h2>{pub.title}</h2>
          <p className="muted">{pub.venue} · {pub.year}</p>
          {pub.abstract && <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{pub.abstract}</p>}
          <div style={{ marginTop: 12 }}>
            {pub.repo && (
              <a className="btn" href={pub.repo} target="_blank" rel="noreferrer">View Code</a>
            )}
            {pub.link && (
              <a className="btn" href={pub.link} target="_blank" rel="noreferrer" style={{ marginLeft: 8 }}>Paper</a>
            )}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link to="/publications" className="muted">← Back to Publications</Link>
          </div>
        </div>
      </article>
    </section>
  )
}
