import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import DecorCardPublic from "../components/decorsPublic/DecorCardPublic";
import { getDecors } from "../services/decorService";
import "./DecorsPage.css";

function DecorsPage() {
  const [decors, setDecors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div className="app">
      <Header />
      <main className="decors-page-main">
        <section className="decors-page-section">
          <header className="decors-page-header">
            <h1 className="decors-page-title">Tous les décors</h1>
            <p className="decors-page-lead">
              Explorez l'ensemble des décors disponibles et réservez celui qui vous convient.
            </p>
          </header>

          {loading && <div className="decors-page-state">Chargement des décors...</div>}
          {error && <div className="decors-page-state decors-page-error">{error}</div>}

          {!loading && !error && (
            <div className="decors-page-grid">
              {decors.map((decor) => (
                <DecorCardPublic key={decor.id} decor={decor} compact />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DecorsPage;
