import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./Hero.css";

/**
 * Composant Hero avec animations GSAP professionnelles
 */
function Hero() {
  const heroRef = useRef(null);
  const welcomeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline pour les animations sequentielles
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Animation d'entree professionnelle
      tl.fromTo(welcomeRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 1 },
        "-=0.4"
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(ctaRef.current?.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
        "-=0.2"
      );
    }, heroRef);

    // Demarrage de la video en boucle
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
    }

    return () => ctx.revert();
  }, []);

  // Scroll vers la section services
  const handleServicesClick = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="hero-content">
        <div className="hero-welcome" ref={welcomeRef}>
          Bienvenue
        </div>
        <h1 className="hero-title" ref={titleRef}>
          <span className="title-main">Next Level Design</span>
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          Nous creons l'impact que les grandes marques exigent.
        </p>
        <p className="hero-description" ref={descriptionRef}>
          Nous unissons strategie, creativite et intelligence artificielle pour
          transformer l'innovation technologique en influence mesurable et
          durable.
        </p>
        <div className="hero-cta" ref={ctaRef}>
          <button className="btn btn-primary" onClick={handleServicesClick}>
            Nos services
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/booking")}
          >
            Reservation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
