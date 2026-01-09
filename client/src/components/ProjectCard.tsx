import React from 'react'

type Props = {
  title: string
  description: string
  image?: string
  repo?: string
  demo?: string
}

const ProjectCard: React.FC<Props> = ({ title, description, image, repo, demo }) => {
  return (
    <article className="card" aria-labelledby={`proj-${title}`} data-highlight={!!demo}>
      {image ? (
        <img src={image} alt={`${title} screenshot`} className="card-media" />
      ) : (
        <div className="card-media" aria-hidden style={{backgroundColor:'rgba(255,255,255,0.02)'}} />
      )}
      <div className="card-body">
        <h3 id={`proj-${title}`}>{title}</h3>
        <p>{description}</p>
        <div className="card-actions">
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="btn">Repo</a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer" className="btn ghost">Demo</a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
