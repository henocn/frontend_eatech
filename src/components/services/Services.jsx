import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "../../data/services.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Composant Services qui affiche la liste des services disponibles
 * avec un carousel Swiper professionnel effet coverflow
 */
function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introTextRef = useRef(null);
  const introImageRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animation du texte intro
      gsap.fromTo(introTextRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introTextRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animation de l'image intro
      gsap.fromTo(introImageRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introImageRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animation du carousel
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error]);

  const loadServices = () => {
    try {
      setLoading(true);
      setServices(servicesData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="services" className="services">
        <div className="services-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement des services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="services">
        <div className="services-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadServices} className="btn btn-primary">
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
        <div className="services-header">
          <h2 className="section-title" ref={titleRef}>Nos Services</h2>
          <div className="services-intro">
            <div className="intro-text" ref={introTextRef}>
              <p>
                Nous concevons des dispositifs créatifs complets, pensés pour
                accompagner votre marque du concept à la réalisation. De
                l'identité visuelle à la production de contenus graphiques et
                interactifs, nous développons des univers esthétiques cohérents,
                stratégiques et parfaitement maîtrisés. Chaque création —
                qu'elle soit digitale, imprimée ou audiovisuelle — est conçue
                pour affirmer votre positionnement, renforcer votre message et
                offrir une expérience remarquable, avec des livrables
                d'excellence prêts à déployer.
              </p>
            </div>
            <div className="intro-image" ref={introImageRef}>
              <img src="/images/services.jpg" alt="Services" />
            </div>
          </div>
        </div>

        <div className="services-carousel-wrapper" ref={carouselRef}>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            spaceBetween={30}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="services-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id} className="service-slide">
                <div className="service-card">
                  <div className="service-card-image">
                    <img src={service.image} alt={service.title} />
                    <div className="service-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                  <div className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Services;
