import React from 'react'

export default function Home() {
  // static profile info pulled from the LaTeX template
  const name = 'Yadynesh D Sonale'
  const email = 'yadyneshsonale@gmail.com'
  const github = 'https://github.com/yadyneshsonale'
  const linkedin = 'https://www.linkedin.com/in/yadynesh'

  return (
    <section className="home">
      <div className="hero">
        <h1 className="name">{name}</h1>
        <p className="tagline">Researcher · ML Engineer · Deep Learning & Computer Vision — I build models and products that move research into impact.</p>
        <div className="links">
          <a className="cta" href="/contact">Contact me</a>
          <a className="cta secondary" href={github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="cta secondary" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="cta secondary" href={`/full_resume.pdf`} target="_blank" rel="noreferrer">Preview résumé (PDF)</a>
        </div>
      </div>
      <div className="home-note">
        <p>Scroll to explore projects and publications — everything is interactive. Click "Hire me" to email me directly.</p>
      </div>
    </section>
  )
}
