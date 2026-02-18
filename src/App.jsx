import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Philosophy from './components/Philosophy';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Global scroll reveal observer
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all reveal elements
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Philosophy />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
