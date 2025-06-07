import React from 'react'

const Hero = () => {
  return (
    <div
      className="hero-section text-white d-flex align-items-end"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
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