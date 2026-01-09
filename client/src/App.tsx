import React, { useState } from 'react'
import PillNav from './components/PillNav'
import ProjectCard from './components/ProjectCard'
import Dither from './components/Dither'
import ScrollFloat from './components/ScrollFloat'

type Project = {
  id: string
  title: string
  description: string
  image?: string
  repo?: string
  demo?: string
}

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

type Experience = {
  id: string
  title: string
  company: string
  period: string
  description: string
  location?: string
  skills?: string[]
}

type Education = {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  grade?: string
  skills?: string[]
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [publications, setPublications] = useState<Pub[]>([])
  const [selectedPub, setSelectedPub] = useState<Pub | null>(null)

  console.log('App rendering')

  // Profile info
  const name = 'Yadynesh D Sonale'
  const email = 'yadyneshsonale@gmail.com'
  const github = 'https://github.com/LeNotaCoder'
  const linkedin = 'https://www.linkedin.com/in/yadynesh'
  const bio = `I'm a researcher and ML engineer passionate about deep learning, computer vision, and medical imaging. I build models that bridge the gap between cutting-edge research and real-world applications.`

  // Experience data
  const experiences: Experience[] = [
    {
      id: 'exp1',
      title: 'Research Intern',
      company: 'Neural Nurture',
      period: 'Aug 2025 - Jan 2026 · 6 mos',
      location: 'Remote',
      description: 'Focused on advanced machine learning techniques for in-context learning and state-of-the-art prompting methodologies.',
      skills: ['In-Context Learning (ICL)', 'SoTA Prompting Techniques', 'DSPy', 'Feature Engineering']
    },
    {
      id: 'exp4',
      title: 'Research Intern',
      company: 'Indian Institute of Information Technology Design & Manufacturing Kancheepuram',
      period: 'May 2025 - Jul 2025 · 3 mos',
      location: 'Chennai, Tamil Nadu, India',
      description: 'Developed a multimodal framework for disease classification by integrating OCT and fundus images. Implemented Fibonacci-based preprocessing to enhance texture detection in OCT images. Designed a transfer learning pipeline to fine-tune models, improving classification accuracy across multimodal datasets.',
      skills: ['Computer Vision', 'Transfer Learning', 'Medical Imaging', 'Multimodal Learning']
    },
    {
      id: 'exp5',
      title: 'Research Intern',
      company: 'Indian Institute of Information Technology Design & Manufacturing Kancheepuram',
      period: 'Dec 2024 - Apr 2025 · 5 mos',
      location: 'Chennai, Tamil Nadu, India',
      description: 'Engineered DASNet, a dual-adaptive CNN architecture for diabetic retinopathy detection in fundus images, achieving state-of-the-art performance through novel feature extraction techniques. Implemented preprocessing techniques, including applying CLAHE to the HSV value channel, to enhance image classification accuracy and evaluated advanced deep learning architectures for performance comparison.',
      skills: ['Deep Learning', 'CNN', 'Computer Vision', 'Medical Imaging', 'Image Processing']
    },
    {
      id: 'exp6',
      title: 'Research Intern',
      company: 'Indian Institute of Information Technology Design & Manufacturing Kancheepuram',
      period: 'Sep 2024 - Jan 2025 · 5 mos',
      location: 'Chennai, Tamil Nadu, India',
      description: 'Achieved 96.364% accuracy in classifying breast abnormalities using thermal imaging and ResNet-50. Enhanced model accuracy by 50% through manual segmentation and preprocessing of thermal images. Authored two full-length research papers submitted to IMECE 2025.',
      skills: ['Deep Learning', 'ResNet', 'Thermal Imaging', 'Medical Imaging', 'Research Writing']
    }
  ]

  // Education data
  const education: Education[] = [
    {
      id: 'edu1',
      institution: 'Indian Institute of Information Technology Design & Manufacturing Kancheepuram',
      degree: 'Bachelor of Technology - BTech',
      field: 'Computer Science',
      period: '2023 - 2027',
      grade: '9.02'
    },
    {
      id: 'edu2',
      institution: 'Indian Institute of Technology, Madras',
      degree: 'Bachelor of Science - BS',
      field: 'Data Science',
      period: '2024 - 2028'
    }
  ]

  // Hardcoded projects data
  const hardcodedProjects: Project[] = [
    {
      id: 'video-question-answering',
      title: 'Video Question Answering',
      description: 'Video-Question Answering with CLIP + LSTM: combines CLIP for per-frame embeddings with LSTM temporal modeling to answer questions about video content.',
      image: '/images/video-question-answering.png',
      repo: 'https://github.com/LeNotaCoder/Video_Question_Answering'
    },
    {
      id: 'beamer-latex-presentation-customizer',
      title: 'SlideWeaver - Beamer LaTeX Presentation Customizer',
      description: 'SlideWeaver v4: processes PDF or TEX and generates Beamer presentations automatically using LLM-powered summarization and extraction (Extract → Summarize → 3 Modules → Combine → PPT → LLM Fix).',
      image: '/images/beamer-latex-presentation-customizer.png',
      repo: 'https://github.com/LeNotaCoder/Beamer-LaTeX-Presentation-Customizer'
    },
    {
      id: 'brain-computer-interfaces',
      title: 'EEG Motor Imagery Classification',
      description: 'EEG Motor Imagery Classification using CNN-LSTM Transfer Learning: an implementation and training pipeline based on Khademi et al. (2022), combining CWT, CNN, and LSTM for 4-class motor imagery classification.',
      image: '/images/brain-computer-interfaces.png',
      repo: 'https://github.com/LeNotaCoder/Brain-Computer-Interfaces'
    },
    {
      id: 'lan-multi-user-communication-system',
      title: 'LAN Multi-User Communication System',
      description: 'LAN Multi-User Communication System: real-time collaboration on local networks: video conferencing, audio streaming, screen sharing, group chat, file transfer, AI assistant and user/session management.',
      image: '/images/lan-multi-user-communication-system.png',
      repo: 'https://github.com/LeNotaCoder/LAN-Multi-User-Communication-System'
    },
    {
      id: 'enhanced-stock-market-analysis',
      title: 'Enhanced Stock Market Analysis',
      description: 'Enhanced Stock Market Analysis: comprehensive pipeline including data collection, cleaning, transformation, visualization, technical indicators, and ML models for predictive analytics.',
      image: '/images/enhanced-stock-market-analysis.png',
      repo: 'https://github.com/LeNotaCoder/Enhanced-Stock-Market-Analysis'
    },
    {
      id: 'texas-holdem',
      title: 'Texas Hold\'em Poker',
      description: 'Texas Hold\'em: C++ implementation supporting 2-10 players, full betting rounds, and hand evaluation.',
      image: '/images/texas-holdem.png',
      repo: 'https://github.com/LeNotaCoder/Texas-Holdem'
    }
  ]

  // Hardcoded publications data
  const hardcodedPublications: Pub[] = [
    {
      id: 'pub-dasnet',
      title: 'DASNet: A Dual Adaptive Subtle-Feature Network for Enhanced Diabetic Retinopathy Detection in Fundus Images',
      venue: 'ICPRAM 2026',
      year: 2026,
      link: undefined,
      image: '/images/dasnet.png',
      abstract: 'The task of identifying Diabetic Retinopathy (DR) plays a crucial role in medical image processing. Early detection of DR is essential for preventing irreversible vision loss. A significant challenge in this task arises from subtle lesions, such as microaneurysms and hemorrhages, in fundus images, as well as from variability in image quality due to different imaging devices. We propose DASNet (Dual Adaptive Subtle-feature Network), designed to capture complex feature representations in fundus images. The proposed architecture employs a dual-branch convolutional neural network that integrates MaxPooling, Adaptive MaxPooling, and Spatial Pyramid Pooling. DASNet achieves accuracies of 95.34% on BiDR, 95.65% on APTOS, and 97.46% on Eye Disease Image dataset.',
      repo: 'https://github.com/LeNotaCoder/DASNet'
    },
    {
      id: 'pub-breast-therm',
      title: 'Deep learning-based classification of breast abnormalities using thermal imaging and ResNet-50',
      venue: 'ASME IMECE 2025',
      year: 2025,
      link: 'https://asme.pinetec.com/imece-india2025/data/pdfs/trk-9/IMECE-INDIA2025-161705.pdf',
      image: '/images/pub-breast-therm.png',
      abstract: 'This paper discusses the application of thermal imaging and deep learning in identifying and classifying mammary abnormalities. The research offers a non-invasive and radiation-free alternative using thermal imaging, which senses temperature variations on the skin surface that may represent underlying abnormalities. The ResNet-50 deep learning model was employed for classifying images into three classes: Possibly Benign (PB), Possibly Malignant (PM), and Normal (N). The overall accuracy achieved was 96.364%, with PM class achieving perfect recall at 1.00000 and highest F1-score of 0.98990.',
      repo: 'https://github.com/LeNotaCoder/thermal-breast-classification'
    },
    {
      id: 'pub-compare-therm',
      title: 'A comparative study of pre-trained deep learning models with and without pre-processing for multi-class classification of thermal breast images',
      venue: 'ASME IMECE 2025',
      year: 2025,
      link: 'https://asme.pinetec.com/imece-india2025/data/pdfs/trk-6/IMECE-INDIA2025-161724.pdf',
      image: '/images/pub-compare-therm.png',
      abstract: 'This study considered the pre-processing methods and the pre-trained deep learning models suitable for the classification of thermal breast images into three categories: Possibly Benign (PB), Possibly Malignant (PM), and Normal (N). The evaluation was conducted on a dataset from 119 patients following AAT protocol. When breast tissue was manually divided into left and right regions, classification improved significantly. The pre-trained ResNet-50 model achieved 0.96364 accuracy, InceptionV3 reached 0.93636, and VGG16 attained 0.900. These results demonstrate the importance of pre-processing in achieving high accuracy.',
      repo: 'https://github.com/LeNotaCoder/thermal-breast-comparison'
    }
  ]

  // Initialize with hardcoded data
  React.useEffect(() => {
    setProjects(hardcodedProjects)
    setPublications(hardcodedPublications)
  }, [])

  // No API needed - data is hardcoded above
  
  const excerpt = (s?: string, n = 200) => (s && s.length > n ? s.slice(0, n) + '…' : s)

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Dither waveColor={[0.18, 0.22, 0.18]} enableMouseInteraction={true} />
      </div>
      <div className="app-root" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        <PillNav />
      <main>
        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-container">
            <div className="about-photo">
              <div className="photo-frame">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop" 
                  alt={name}
                />
              </div>
            </div>
            <div className="about-content">
              <h1 className="about-name">{name}</h1>
              <p className="about-title">Researcher · ML Engineer · Deep Learning & Computer Vision</p>
              <p className="about-bio">{bio}</p>
              <div className="about-actions">
                <a className="btn-primary" href={`http://localhost:4000/resume/full_resume.pdf`} target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  View Resume
                </a>
                <a className="btn-secondary" href={`mailto:${email}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-container">
          <div className="section-header">
            <h2 className="section-title"><ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="top bottom" scrollEnd="center center" stagger={0.03}>Experience</ScrollFloat></h2>
            <p className="section-subtitle">My professional journey and key contributions</p>
          </div>
          <div className="experience-timeline">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="experience-item">
                <div className="experience-marker"></div>
                <div className="experience-content">
                  <div className="experience-period">{exp.period}</div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-company">{exp.company}</div>
                  {exp.location && <div className="experience-location">{exp.location}</div>}
                  <p className="experience-description">{exp.description}</p>
                  {exp.skills && (
                    <div className="experience-skills">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section-container">
          <div className="section-header">
            <h2 className="section-title"><ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>Education</ScrollFloat></h2>
            <p className="section-subtitle">Academic background and qualifications</p>
          </div>
          <div className="education-grid">
            {education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="education-content">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <div className="education-field">{edu.field}</div>
                  <div className="education-institution">{edu.institution}</div>
                  <div className="education-period">{edu.period}</div>
                  {edu.grade && <div className="education-grade">Grade: {edu.grade}</div>}
                  {edu.skills && (
                    <div className="education-skills">
                      {edu.skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="section-container">
          <div className="section-header">
            <h2 className="section-title"><ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>Publications</ScrollFloat></h2>
            <p className="section-subtitle">Research contributions in machine learning and medical imaging</p>
          </div>
          <div className="publications-grid">
            {publications.map((p) => (
              <article
                key={p.id}
                className="publication-card"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPub(p)}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedPub(p) }}
              >
                {p.image && (
                  <div className="pub-image" style={{ backgroundImage: `url(${p.image})` }} />
                )}
                <div className="pub-content">
                  <h3 className="pub-title">{p.title}</h3>
                  <div className="pub-meta">
                    <span className="pub-venue">{p.venue}</span>
                    <span className="pub-year">{p.year}</span>
                  </div>
                  <p className="pub-abstract">{excerpt(p.abstract, 150)}</p>
                  <div className="pub-actions">
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="pub-link" onClick={(e) => e.stopPropagation()}>
                        Read Paper →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Publication Detail Modal */}
        {selectedPub && (
          <div className="modal-overlay" onClick={() => setSelectedPub(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedPub(null)}>×</button>
              {selectedPub.image && <img src={selectedPub.image} alt={selectedPub.title} className="modal-image" />}
              <h2>{selectedPub.title}</h2>
              <p className="muted">{selectedPub.venue} · {selectedPub.year}</p>
              {selectedPub.abstract && <p style={{ marginTop: '16px', lineHeight: '1.7' }}>{selectedPub.abstract}</p>}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                {selectedPub.link && <a href={selectedPub.link} target="_blank" rel="noreferrer" className="btn-primary">Read Paper</a>}
                {selectedPub.repo && <a href={selectedPub.repo} target="_blank" rel="noreferrer" className="btn-secondary">View Code</a>}
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <section id="projects" className="section-container">
          <div className="section-header">
            <h2 className="section-title"><ScrollFloat animationDuration={1} ease="back.inOut(2)" scrollStart="center bottom+=50%" scrollEnd="bottom bottom-=40%" stagger={0.03}>Projects</ScrollFloat></h2>
            <p className="section-subtitle">Selected works showcasing my technical expertise</p>
          </div>
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} title={p.title} description={p.description} image={p.image} repo={p.repo} demo={p.demo} />
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>© 2026 {name}. Built with React & TypeScript.</p>
      </footer>
    </div>
    </>
  )
}
