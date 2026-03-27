import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const AshokaCkakra = () => (
  <svg className="chakra-watermark" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" stroke="white" strokeWidth="2" />
    <circle cx="60" cy="60" r="8" fill="white" />
    <g stroke="white" strokeWidth="1.2">
      <line x1="60" y1="6" x2="60" y2="114" />
      <line x1="6" y1="60" x2="114" y2="60" />
      <line x1="21.8" y1="21.8" x2="98.2" y2="98.2" />
      <line x1="98.2" y1="21.8" x2="21.8" y2="98.2" />
      <line x1="35" y1="10" x2="85" y2="110" />
      <line x1="85" y1="10" x2="35" y2="110" />
      <line x1="10" y1="35" x2="110" y2="85" />
      <line x1="110" y1="35" x2="10" y2="85" />
      <line x1="28" y1="14" x2="92" y2="106" />
      <line x1="92" y1="14" x2="28" y2="106" />
      <line x1="14" y1="28" x2="106" y2="92" />
      <line x1="106" y1="28" x2="14" y2="92" />
    </g>
  </svg>
);

const ParliamentSVG = () => (
  <svg className="parliament-svg" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="60" width="180" height="70" rx="2" fill="#0a2050" />
    <rect x="20" y="48" width="160" height="18" rx="2" fill="#0d2b6e" />
    <ellipse cx="100" cy="48" rx="55" ry="28" fill="#0a2050" />
    <ellipse cx="100" cy="38" rx="35" ry="20" fill="#0d2b6e" />
    <rect x="97" y="8" width="3" height="32" fill="#e8b84b" />
    <polygon points="100,8 116,14 100,20" fill="#FF9933" />
    {[20, 34, 48, 62, 76, 90, 104, 118, 132, 146, 160].map((x, i) => (
      <rect key={i} x={x} y="60" width="8" height="60" fill="#122d75" />
    ))}
  </svg>
);

const Person1 = () => (
  <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="42" r="26" fill="#c8956c" />
    <ellipse cx="40" cy="24" rx="19" ry="12" fill="#2c1a0e" />
    <rect x="17" y="65" width="46" height="75" rx="4" fill="#d4537e" />
    <rect x="17" y="65" width="12" height="75" rx="2" fill="#b0426a" />
    <path d="M20 68 Q30 78 40 72 Q50 66 60 74" stroke="#f4c0d1" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="32" cy="40" r="3" fill="#5c3317" />
    <circle cx="48" cy="40" r="3" fill="#5c3317" />
    <path d="M33 52 Q40 57 47 52" stroke="#a0522d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="30" r="2" fill="#e24b4a" />
  </svg>
);

const Person2 = () => (
  <svg viewBox="0 0 90 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="44" r="32" fill="#b07850" />
    <ellipse cx="45" cy="20" rx="25" ry="14" fill="#1a0f06" />
    <rect x="20" y="74" width="52" height="76" rx="4" fill="#163580" />
    <path d="M34 74 L45 88 L56 74" fill="#0a2050" />
    <circle cx="36" cy="42" r="3.5" fill="#3d1f0a" />
    <circle cx="54" cy="42" r="3.5" fill="#3d1f0a" />
    <path d="M37 56 Q45 62 53 56" stroke="#7a4520" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M37 48 Q45 52 53 48" stroke="#2c1a0e" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const Person3 = () => (
  <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="44" r="28" fill="#c4906a" />
    <ellipse cx="40" cy="26" rx="22" ry="8" fill="white" opacity="0.9" />
    <rect x="18" y="24" width="44" height="6" rx="3" fill="#e8e8e8" />
    <rect x="14" y="70" width="52" height="70" rx="4" fill="#f1efe8" />
    <circle cx="32" cy="42" r="3" fill="#5c3317" />
    <circle cx="48" cy="42" r="3" fill="#5c3317" />
    <path d="M33 55 Q40 60 47 55" stroke="#a0522d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="32" cy="42" r="7" stroke="#888" strokeWidth="1" fill="none" />
    <circle cx="48" cy="42" r="7" stroke="#888" strokeWidth="1" fill="none" />
    <line x1="25" y1="40" x2="19" y2="38" stroke="#888" strokeWidth="1" />
    <line x1="55" y1="40" x2="61" y2="38" stroke="#888" strokeWidth="1" />
  </svg>
);

const StarField = () => (
  <svg className="star-field" viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg">
    {[
      [60, 30], [140, 18], [220, 40], [310, 22], [400, 35], [490, 15],
      [90, 55], [180, 65], [560, 28], [620, 45], [650, 18], [430, 50],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 1.5 : 1} fill="white" opacity={0.3 + (i % 3) * 0.1} />
    ))}
  </svg>
);

const GridLines = () => (
  <svg className="grid-lines" viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#e8b84b" strokeWidth="0.5" opacity="0.18">
      {[80, 110, 140].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} />)}
      {[30, 70, 110, 150, 190, 230].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" />)}
    </g>
    <circle cx="70" cy="110" r="4" fill="#e8b84b" opacity="0.6" />
    <circle cx="150" cy="80" r="3" fill="#e8b84b" opacity="0.5" />
    <circle cx="230" cy="140" r="4" fill="#1d9e75" opacity="0.7" />
    <circle cx="110" cy="140" r="3" fill="#e8b84b" opacity="0.4" />
  </svg>
);

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="home-wrapper">
      {/* Tricolor top strip */}
      <div className="tricolor-strip">
        <div className="strip saffron" />
        <div className="strip white" />
        <div className="strip green" />
      </div>

      {/* Hero Banner */}
      <section className="hero-banner">
        {/* Logo */}
        <div className="logo-container">
          <img src="https://ik.imagekit.io/cblndrocc/webp.webp" alt="Citizen Sathi Logo" className="logo-image" />
        </div>

        {/* Login Button */}
        <button className="login-btn-top" onClick={() => navigate('/login')}>
          Login
        </button>

        <StarField />
        <AshokaCkakra />

        {/* Parliament silhouette */}
        <div className="parliament-wrap">
          <ParliamentSVG />
        </div>

        {/* Digital grid (right side) */}
        <div className="grid-wrap">
          <GridLines />
        </div>

        {/* Sun glow */}
        <div className="sun-glow" />

        {/* LEFT: Text content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span>DIGITAL INDIA INITIATIVE</span>
          </div>

          <h1 className="hero-heading">
            Welcome to<br />
            <span className="brand-name">CITIZEN SATHI</span>
          </h1>

          <p className="hero-hindi">नागरिक का साथी — Your Governance Partner</p>

          <div className="hero-divider" />

          <p className="hero-tagline">
            Access services, file complaints,<br />
            explore schemes — all in one place.
          </p>

          <div className="hero-buttons">
            <button className="btn-gold" onClick={handleGetStarted}>Get Started</button>
          </div>

          <div className="stat-pills">
            <span className="pill">2.4M+ Citizens</span>
            <span className="pill">340+ Services</span>
            <span className="pill">98% Resolved</span>
          </div>
        </div>

        {/* RIGHT: People illustration */}
        <div className="people-group">
          <div className="person person-left">
            <Person1 />
          </div>
          <div className="person person-center">
            <Person2 />
          </div>
          <div className="person person-right">
            <Person3 />
          </div>
        </div>

        {/* Ground strip */}
        <div className="ground-strip" />

        {/* Made in India */}
        {/* <p className="made-in-india">Made with pride in India</p> */}
      </section>
    </div>
  );
}
