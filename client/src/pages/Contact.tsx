import React, { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('http://localhost:4000/api/contact', { name, email, message })
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section className="home">
      <div style={{maxWidth:700, margin:'30px auto'}}>
        <h2>Contact</h2>
        <p>If you'd like to collaborate or hire me, send a short message and I'll reply.</p>
        <form onSubmit={submit} style={{display:'grid',gap:12}}>
          <input placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} required />
          <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <textarea placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} rows={6} required />
          <div style={{display:'flex',gap:10}}>
            <button className="cta" type="submit" disabled={status==='sending'}>{status==='sending' ? 'Sending...' : 'Send message'}</button>
            {status==='sent' && <span style={{color:'#3ddc97',alignSelf:'center'}}>Sent — thank you!</span>}
            {status==='error' && <span style={{color:'#ff7a59',alignSelf:'center'}}>Error — try again.</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
