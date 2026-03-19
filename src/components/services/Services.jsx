import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "../../data/services.json";

import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section Nos Services : design pro, images proportionnées, animations soignées.
 */
function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    try {
      setLoading(true);
      setServices(servicesData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading || error || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".service-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          transformOrigin: "center",
          scrollTrigger: { trigger: lineRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error]);

  if (loading) {
    return (
      <section id="services" className="services">
        <div className="services-container">
          <div className="services-loading">
            <div className="services-spinner" />
            <p>Chargement des services…</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="services">
        <div className="services-container">
          <div className="services-error">
            <p>{error}</p>
            <button
              type="button"
              className="services-retry"
              onClick={() => {
                setError(null);
                setServices(servicesData);
              }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-container">
        <header className="services-header">
          <h2 className="services-title" ref={titleRef}>
            Nos Services
          </h2>
          <span className="services-title-line" ref={lineRef} aria-hidden />
          <div className="services-intro" ref={introRef}>
            <p className="services-intro-text">
              Nous concevons des dispositifs créatifs complets, du concept à la réalisation — identité visuelle,
              contenus graphiques et interactifs, pour des univers cohérents et des livrables prêts à déployer. <br /> <br />
              Nous intervenons également pour couvrir des événements, des stands, des salons, des conférences avec un délai de livraison très rapide.
            </p>
            <div className="services-intro-image">
              <img src="/images/services.jpg" alt="" />
            </div>
          </div>
        </header>

        <div className="services-grid" ref={gridRef}>
          {services.map((service, index) => (
            <article key={service.id} className="service-card">
              <div className="service-card-media">
                <img src={service.image} alt="" />
              </div>
              <div className="service-card-body">
                <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
