import { useState, useEffect } from "react";
import { getDecors } from "../../services/decorService";
import DecorCardPublic from "./DecorCardPublic";
import "./DecorsSection.css";

const INITIAL_COUNT = 6;

/**
 * Section d’affichage des décors sur la page d’accueil (après Services).
 * Affiche 6 cartes puis un bouton "Voir plus" pour afficher le reste.
 */
function DecorsSection() {
  const [decors, setDecors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const fetchDecors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDecors();
        setDecors(data);
      } catch (err) {
        setError(err?.message || "Impossible de charger les décors.");
      } finally {
        setLoading(false);
      }
    };
    fetchDecors();
  }, []);

  const visibleDecors = decors.slice(0, displayCount);
  const hasMore = decors.length > displayCount;

  const handleSeeMore = () => {
    setDisplayCount((prev) => prev + INITIAL_COUNT);
  };

  if (loading) {
    return (
      <section id="decors" className="decors-section">
        <div className="decors-section-inner">
          <header className="decors-section-header">
            <h2 className="decors-section-title">Nos décors</h2>
            <p className="decors-section-lead">
              Choisissez un décor et réservez directement vos créneaux.
            </p>
          </header>
          <div className="decors-loading">Chargement des décors…</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="decors" className="decors-section">
        <div className="decors-section-inner">
          <header className="decors-section-header">
            <h2 className="decors-section-title">Nos décors</h2>
          </header>
          <div className="decors-error">{error}</div>
        </div>
      </section>
    );
  }

  if (decors.length === 0) {
    return (
      <section id="decors" className="decors-section">
        <div className="decors-section-inner">
          <header className="decors-section-header">
            <h2 className="decors-section-title">Nos décors</h2>
          </header>
          <p className="decors-empty">Aucun décor disponible pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="decors" className="decors-section">
      <div className="decors-section-inner">
        <header className="decors-section-header">
          <h2 className="decors-section-title">Nos décors</h2>
          <p className="decors-section-lead">
            Choisissez un décor et réservez directement vos créneaux.
          </p>
        </header>

        <div className="decors-grid">
          {visibleDecors.map((decor) => (
            <DecorCardPublic key={decor.id} decor={decor} />
          ))}
        </div>

        {hasMore && (
          <div className="decors-actions">
            <button type="button" className="decors-btn-more" onClick={handleSeeMore}>
              Voir plus
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DecorsSection;
