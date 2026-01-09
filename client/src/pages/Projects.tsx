import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'

type Project = {
  id: string
  title: string
  description: string
  image?: string
  repo?: string
  demo?: string
}

export default function Projects() {
  const [items, setItems] = useState<Project[]>([])

  useEffect(() => {
    axios.get<Project[]>('http://localhost:4000/api/projects').then((r) => setItems(r.data)).catch(() => {})
  }, [])

  return (
    <section className="grid-page">
      <h2>Projects</h2>
      <div className="grid">
        {items.map((p) => (
          <ProjectCard key={p.id} title={p.title} description={p.description} image={p.image} repo={p.repo} demo={p.demo} />
        ))}
      </div>
    </section>
  )
}
