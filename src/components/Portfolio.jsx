import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ExternalLink } from 'lucide-react';
import './Portfolio.css';

const projects = [
    {
        id: 1,
        category: 'Architecture',
        title: 'Desert Bloom Residence',
        subtitle: 'Private Villa · UAE',
        description: 'A contemporary villa that draws from the organic forms of desert flora, featuring sweeping curved walls, shaded courtyards, and a palette of warm sandstone and ivory. The design integrates passive cooling through strategic orientation and deep overhangs.',
        tags: ['Residential', 'Sustainable', 'Contemporary'],
        gradient: 'linear-gradient(135deg, #C9737A 0%, #E8B4B8 40%, #F2E4D2 100%)',
        accent: '#C9737A',
        year: '2024',
        area: '450 m²',
    },
    {
        id: 2,
        category: 'Interior',
        title: 'Saffron Living Suite',
        subtitle: 'Luxury Apartment · Dubai',
        description: 'A refined residential interior that merges Arabesque geometric patterns with Scandinavian minimalism. Rich saffron accents, hand-woven textiles, and bespoke joinery create a space that feels both opulent and serene.',
        tags: ['Luxury', 'Residential', 'Arabesque'],
        gradient: 'linear-gradient(135deg, #E8B4B8 0%, #F5E6E8 40%, #C9737A 100%)',
        accent: '#A85560',
        year: '2024',
        area: '180 m²',
    },
    {
        id: 3,
        category: 'Concepts',
        title: 'Lattice Cultural Centre',
        subtitle: 'Public Building · Concept',
        description: 'A conceptual cultural centre inspired by the intricate mashrabiya screens of Islamic architecture. The perforated facade creates ever-changing light patterns throughout the day, transforming the interior into a living canvas.',
        tags: ['Cultural', 'Conceptual', 'Islamic Geometry'],
        gradient: 'linear-gradient(135deg, #F2E4D2 0%, #E8B4B8 50%, #D4BC9E 100%)',
        accent: '#C9737A',
        year: '2023',
        area: '2,400 m²',
    },
    {
        id: 4,
        category: 'Interior',
        title: 'Ivory Wellness Spa',
        subtitle: 'Commercial Interior · Abu Dhabi',
        description: 'A sanctuary of calm designed around the philosophy of mindful restoration. Travertine surfaces, soft ambient lighting, and cascading water features create an environment that soothes the senses from the moment of entry.',
        tags: ['Commercial', 'Wellness', 'Biophilic'],
        gradient: 'linear-gradient(135deg, #F5E6E8 0%, #D4BC9E 50%, #E8B4B8 100%)',
        accent: '#7A7068',
        year: '2023',
        area: '320 m²',
    },
    {
        id: 5,
        category: 'Architecture',
        title: 'Crescent Tower',
        subtitle: 'Mixed-Use Tower · Concept',
        description: 'A 32-storey mixed-use tower whose silhouette references the crescent moon — a symbol deeply embedded in Islamic culture. Sky gardens at every 8th floor create vertical green corridors, while the facade\'s parametric patterning filters harsh sunlight.',
        tags: ['High-Rise', 'Mixed-Use', 'Parametric'],
        gradient: 'linear-gradient(135deg, #2C2A28 0%, #4A4540 40%, #C9737A 100%)',
        accent: '#E8B4B8',
        year: '2024',
        area: '18,000 m²',
    },
    {
        id: 6,
        category: 'Concepts',
        title: 'Garden of Verses',
        subtitle: 'Landscape Pavilion · Concept',
        description: 'An immersive landscape pavilion where poetry and architecture merge. Verses from classical Arabic poetry are etched into stone pathways, while the pavilion structure frames views of a contemplative garden designed around the four rivers of paradise.',
        tags: ['Landscape', 'Cultural', 'Poetic'],
        gradient: 'linear-gradient(135deg, #E8D5BC 0%, #F5E6E8 50%, #C9737A 100%)',
        accent: '#A85560',
        year: '2023',
        area: '800 m²',
    },
];

const filters = ['All', 'Architecture', 'Interior', 'Concepts'];

function ProjectModal({ project, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-card"
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal image */}
                <div className="modal-image" style={{ background: project.gradient }}>
                    <div className="modal-image-content">
                        <span className="modal-category">{project.category}</span>
                        <h3 className="modal-image-title">{project.title}</h3>
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close modal" id="modal-close-btn">
                        <X size={20} />
                    </button>
                </div>

                {/* Modal body */}
                <div className="modal-body">
                    <div className="modal-meta">
                        <div className="modal-meta-item">
                            <span className="meta-label">Location</span>
                            <span className="meta-value">{project.subtitle}</span>
                        </div>
                        <div className="modal-meta-item">
                            <span className="meta-label">Year</span>
                            <span className="meta-value">{project.year}</span>
                        </div>
                        <div className="modal-meta-item">
                            <span className="meta-label">Area</span>
                            <span className="meta-value">{project.area}</span>
                        </div>
                    </div>

                    <p className="modal-description">{project.description}</p>

                    <div className="modal-tags">
                        {project.tags.map(tag => (
                            <span key={tag} className="modal-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({ project, index, onClick }) {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), index * 80);
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.1 }
        );
        const el = ref.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [index]);

    return (
        <div
            className="project-card reveal"
            ref={ref}
            onClick={() => onClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
            id={`project-card-${project.id}`}
        >
            {/* Image area */}
            <div className="card-image" style={{ background: project.gradient }}>
                <div className="card-image-overlay">
                    <ZoomIn size={24} className="card-zoom-icon" />
                </div>
                <span className="card-category-badge">{project.category}</span>
                <div className="card-image-text">
                    <span className="card-year">{project.year}</span>
                </div>
            </div>

            {/* Card body */}
            <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-subtitle">{project.subtitle}</p>
                <p className="card-desc">{project.description.slice(0, 100)}...</p>
                <div className="card-tags">
                    {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="card-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="portfolio" className="portfolio">
            <div className="container">
                {/* Header */}
                <div className="portfolio-header reveal">
                    <div className="section-label">Portfolio</div>
                    <h2 className="section-title">
                        A Collection of <em>Visions</em>
                    </h2>
                    <p className="portfolio-subtitle">
                        Each project is a dialogue between space, light, and human experience —
                        crafted with intention and brought to life with care.
                    </p>
                </div>

                {/* Filters */}
                <div className="portfolio-filters reveal" style={{ transitionDelay: '0.1s' }}>
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                            id={`filter-${f.toLowerCase()}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div className="portfolio-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <ProjectCard
                                    project={project}
                                    index={i}
                                    onClick={setSelectedProject}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
