import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './landing_page.css';

function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">Rivier</div>
                <nav>
                    <ul className="nav-list">
                        <li>
                            <Link to="/smartcontracts" className="nav-link">Smart Contracts</Link>
                        </li>
                        <li>
                            <Link to="/services" className="nav-link">Services</Link>
                        </li>
                        <li>
                            <Link to="/solutions" className="nav-link">Solutions</Link>
                        </li>
                        <li>
                            <Link to="/roadmap" className="nav-link">Roadmap</Link>
                        </li>
                        <li>
                            <Link to="/whitepaper" className="nav-link">Whitepaper</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

function HeroSection() {
    return (
        <section className="hero" id="hero">
            <div className="hero-content">
                <h1 className="hero-title">A Fast Blockchain.</h1>
                <h2 className="hero-tagline">Scalable AI.</h2>
                <p className="hero-description">
                    Our technology performing fast blockchain (120K TPS) and it has guaranteed
                    AI-based data security. Proof of Stake, its consensus algorithm enables unlimited speeds.
                </p>
                <div className="button-group">
                    <Link to="/getstarted" className="btn primary-btn">Get started</Link>
                    <Link to="/ecosystems" className="btn secondary-btn">Ecosystems</Link>
                </div>
            </div>
            {/* Robotics & Infinity Visuals */}
            <div className="robotics-section">
                <img src="/infinity.png" alt="Infinity Symbol" className="infinity-img" />
            </div>
        </section>
    );
}

function Section({ id, title, children }) {
    return (
        <section id={id} className="content-section">
            <h2 className="section-title">{title}</h2>
            <p className="section-description">{children}</p>
        </section>
    );
}

function LandingPage() {
    return (
        <>
            <Helmet>
                <title>Rivier | Blockchain & AI Technology</title>
                <meta name="description" content="Experience fast blockchain performance and scalable AI-powered solutions at Rivier." />
            </Helmet>
            <div className="newdesign-container">
                <Header />
                <HeroSection />
                <Section id="smartcontracts" title="Smart Contracts">
                    Discover our secure and efficient smart contract solutions.
                </Section>
                <Section id="services" title="Services">
                    Explore our comprehensive range of blockchain services.
                </Section>
                <Section id="solutions" title="Solutions">
                    Discover innovative solutions tailored for your business.
                </Section>
                <Section id="roadmap" title="Roadmap">
                    See what lies ahead in our journey of continuous innovation.
                </Section>
                <Section id="whitepaper" title="Whitepaper">
                    Download our whitepaper to dive deeper into our technology.
                </Section>
                <footer className="footer">
                    <p>&copy; 2025 Rivier. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
}

export default LandingPage;
