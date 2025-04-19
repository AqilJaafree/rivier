import { useEffect } from 'react';
import './App.css';

function App() {
  // Reveal elements on scroll with a simple scroll effect.
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const onScroll = () => {
      const windowHeight = window.innerHeight;
      reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const revealThreshold = 100;
        if (elementTop < windowHeight - revealThreshold) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Fixed Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">Rivier</div>
          <nav>
            <ul className="nav-list">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#portfolio" className="nav-link">Portfolio</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content reveal">
          <h1 className="hero-title">Welcome to Rivier</h1>
          <p className="hero-tagline">
            Innovating the Future with Creative Web3 Solutions
          </p>
          <a href="#about" className="btn primary-btn">Discover More</a>
        </div>
      </section>

      {/* Main Content Sections */}
      <main>
        <section id="about" className="content-section reveal">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            We combine minimalist design with breakthrough technology to create secure, user‑centric Web3 solutions that empower businesses and individuals.
          </p>
        </section>

        <section id="services" className="content-section reveal">
          <h2 className="section-title">Our Services</h2>
          <p className="section-description">
            Whether it’s blockchain integration or decentralized applications, each solution is crafted with precision and creative flair.
          </p>
        </section>

        <section id="portfolio" className="content-section reveal">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-description">
            Discover our cutting‑edge projects that showcase our commitment to design excellence and innovative technology.
          </p>
        </section>

        <section id="contact" className="content-section reveal">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">
            Ready to revolutionize your digital presence? Join us in building visionary Web3 innovations.
          </p>
          <a href="mailto:contact@rivier.com" className="btn secondary-btn">Contact Us</a>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Rivier. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
