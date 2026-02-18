import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
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
    {
        id: 8,
        category: 'Cafe',
        title: 'Cafe Design',
        subtitle: 'Cafe Interior · Commercial',
        description: 'A collection of cafe interior designs exploring warmth, texture, and atmosphere. Each space is crafted to balance rustic charm with contemporary refinement — creating environments that invite lingering, conversation, and connection over coffee.',
        tags: ['Cafe', 'Commercial', 'Interior'],
        image: '/exterior/cafe1.jpeg',
        // Multiple images for swipeable gallery
        images: [
            '/exterior/cafe1.jpeg',
            '/exterior/cafe-2.jpeg',
            '/exterior/cafe-3.jpeg',
            '/exterior/cafe-4.jpeg',
            '/exterior/cafe-6.jpeg',
        ],
        gradient: 'linear-gradient(135deg, #D4BC9E 0%, #F2E4D2 50%, #C9737A 100%)',
        year: '2024',
        area: '—',
    },
];

const filters = ['All', 'Architecture', 'Interior', 'Cafe', 'Concepts'];

// ── Swipeable Image Gallery (used inside modal) ──────────────────────────────
function ImageGallery({ images }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const go = (dir) => {
        setDirection(dir);
        setCurrent(prev => (prev + dir + images.length) % images.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <div className="gallery-wrap">
            {/* Slides */}
            <div className="gallery-viewport">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.img
                        key={current}
                        src={images[current]}
                        alt={`View ${current + 1}`}
                        className="gallery-img"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -60) go(1);
                            else if (info.offset.x > 60) go(-1);
                        }}
                    />
                </AnimatePresence>

                {/* Arrows */}
                {images.length > 1 && (
                    <>
                        <button className="gallery-arrow gallery-arrow-left" onClick={() => go(-1)} aria-label="Previous image">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="gallery-arrow gallery-arrow-right" onClick={() => go(1)} aria-label="Next image">
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Counter */}
                <div className="gallery-counter">{current + 1} / {images.length}</div>
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="gallery-dots">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`gallery-dot ${i === current ? 'active' : ''}`}
                            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Project Modal ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
    const images = project.images || (project.image ? [project.image] : []);

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
                {/* Close button */}
                <button className="modal-close" onClick={onClose} aria-label="Close modal" id="modal-close-btn">
                    <X size={20} />
                </button>

                {/* Image area — gallery if multiple, single if one */}
                <div className="modal-image" style={{ background: project.gradient }}>
                    {images.length > 1 ? (
                        <ImageGallery images={images} />
                    ) : images.length === 1 ? (
                        <>
                            <img src={images[0]} alt={project.title} className="modal-img" />
                            <div className="modal-image-overlay" />
                            <div className="modal-image-content">
                                <span className="modal-category">{project.category}</span>
                                <h3 className="modal-image-title">{project.title}</h3>
                            </div>
                        </>
                    ) : (
                        <div className="modal-image-content">
                            <span className="modal-category">{project.category}</span>
                            <h3 className="modal-image-title">{project.title}</h3>
                        </div>
                    )}
                </div>

                {/* Modal body */}
                <div className="modal-body">
                    {/* Show title/category below image when gallery mode */}
                    {images.length > 1 && (
                        <div className="modal-gallery-header">
                            <span className="modal-category-inline">{project.category}</span>
                            <h3 className="modal-title-inline">{project.title}</h3>
                        </div>
                    )}
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

// ── Project Card ──────────────────────────────────────────────────────────────
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

    const hasGallery = project.images && project.images.length > 1;

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
                {/* Gallery badge */}
                {hasGallery && (
                    <span className="card-gallery-badge">
                        ⊞ {project.images.length} photos
                    </span>
                )}
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

// ── Main Portfolio Section ────────────────────────────────────────────────────
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
