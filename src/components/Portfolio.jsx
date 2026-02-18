import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ExternalLink } from 'lucide-react';
import './Portfolio.css';

const projects = [
    {
        id: 1,
        category: 'Architecture',
        title: 'Exterior Design I',
        subtitle: 'Architectural Project',
        description: 'A contemporary exterior design that draws from clean geometric forms and warm material palettes. The facade composition balances solid and void, creating a dynamic interplay of light and shadow throughout the day.',
        tags: ['Exterior', 'Residential', 'Contemporary'],
        image: '/exterior/1.jpeg',
        gradient: 'linear-gradient(135deg, #C9737A 0%, #E8B4B8 40%, #F2E4D2 100%)',
        year: '2024',
        area: '—',
    },
    {
        id: 2,
        category: 'Architecture',
        title: 'Exterior Design II',
        subtitle: 'Architectural Project',
        description: 'An architectural exterior study exploring the relationship between built form and landscape. Thoughtful massing and material choices create a structure that feels rooted in its context while projecting a refined, modern character.',
        tags: ['Exterior', 'Architecture', 'Modern'],
        image: '/exterior/2.jpeg',
        gradient: 'linear-gradient(135deg, #E8B4B8 0%, #F5E6E8 40%, #C9737A 100%)',
        year: '2024',
        area: '—',
    },
    {
        id: 3,
        category: 'Interior',
        title: 'Living Space',
        subtitle: 'Interior Design Project',
        description: 'A refined residential interior that harmonises warmth and elegance. Carefully selected furnishings, layered lighting, and a cohesive material palette create a living space that feels both inviting and sophisticated.',
        tags: ['Residential', 'Living Room', 'Interior'],
        image: '/interior/2.jpg.jpeg',
        gradient: 'linear-gradient(135deg, #F2E4D2 0%, #E8B4B8 50%, #D4BC9E 100%)',
        year: '2024',
        area: '—',
    },
    {
        id: 4,
        category: 'Interior',
        title: 'Front Elevation Interior',
        subtitle: 'Interior Design Project',
        description: 'An interior elevation study that demonstrates the careful orchestration of spatial proportions, material transitions, and decorative detail. Every surface is considered as part of a unified design language.',
        tags: ['Interior', 'Elevation', 'Detail'],
        image: '/interior/front[1].jpg.jpeg',
        gradient: 'linear-gradient(135deg, #F5E6E8 0%, #D4BC9E 50%, #E8B4B8 100%)',
        year: '2023',
        area: '—',
    },
    {
        id: 5,
        category: 'Interior',
        title: 'Kitchen Design I',
        subtitle: 'Kitchen Interior · Residential',
        description: 'A kitchen interior designed around the principles of functional elegance. Clean cabinetry lines, premium countertop materials, and considered lighting create a culinary space that is as beautiful as it is practical.',
        tags: ['Kitchen', 'Residential', 'Functional'],
        image: '/interior/kitchen 3.jpg.jpeg',
        gradient: 'linear-gradient(135deg, #2C2A28 0%, #4A4540 40%, #C9737A 100%)',
        year: '2024',
        area: '—',
    },
    {
        id: 6,
        category: 'Interior',
        title: 'Kitchen Design II',
        subtitle: 'Kitchen Interior · Residential',
        description: 'A second kitchen study exploring a warmer, more textured approach. Natural wood tones, stone surfaces, and integrated appliances come together in a design that celebrates the kitchen as the heart of the home.',
        tags: ['Kitchen', 'Warm Tones', 'Natural Materials'],
        image: '/interior/kitchen33.jpg.jpeg',
        gradient: 'linear-gradient(135deg, #E8D5BC 0%, #F5E6E8 50%, #C9737A 100%)',
        year: '2023',
        area: '—',
    },
    {
        id: 7,
        category: 'Interior',
        title: 'Kitchen Design III',
        subtitle: 'Kitchen Interior · Residential',
        description: 'A contemporary kitchen that pushes the boundaries of spatial efficiency and aesthetic refinement. Handleless cabinetry, integrated lighting strips, and a monochromatic palette give this kitchen a sleek, timeless quality.',
        tags: ['Kitchen', 'Contemporary', 'Minimalist'],
        image: '/interior/kitchen44.jpg.jpeg',
        gradient: 'linear-gradient(135deg, #C9737A 0%, #F2E4D2 50%, #E8B4B8 100%)',
        year: '2023',
        area: '—',
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
                    {project.image && (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="modal-img"
                        />
                    )}
                    <div className="modal-image-overlay" />
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
                {project.image && (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="card-img"
                        loading="lazy"
                    />
                )}
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
