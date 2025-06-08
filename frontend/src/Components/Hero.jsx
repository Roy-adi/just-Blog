import React from 'react'
import blogimg from '../assets/blogHero.jpg'

const Hero = () => {
  return (
    <div
      className="hero-section text-white d-flex align-items-end"
      style={{
        backgroundImage: `url(${blogimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        padding: "40px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "600px" }}>
        <span
          className="badge bg-secondary mb-2"
          style={{ borderRadius: "20px", padding: "5px 10px" }}
        >
          Destination
        </span>
        <h1 className="fw-bold">Exploring the Wonders of Hiking</h1>
        <p>
          An iconic landmarks, this post unveils the secrets that make this destination a traveler's paradise.
        </p>
        
      </div>
    </div>
  )
}

export default Hero