import { useState, useEffect } from "react";
import { Users, DollarSign, MapPin, Building2 } from "lucide-react";
import Modal from "../modal/Modal";
import { getDecorById } from "../../services/decorService";
import "./DecorDetailModal.css";

/**
 * Modal de détail d’un décor (studio, description complète, galerie).
 * Données chargées via getDecorById pour avoir studio_details.
 */
function DecorDetailModal({ decorId, initialDecor, onClose, onReserve }) {
  const [decor, setDecor] = useState(initialDecor || null);
  const [loading, setLoading] = useState(!initialDecor?.studio_details);

  useEffect(() => {
    if (!decorId) return;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getDecorById(decorId);
        setDecor(data);
      } catch (err) {
        setDecor(initialDecor || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [decorId]);

  const studio = decor?.studio_details || null;
  const medias = decor?.pub_medias_details || [];

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="decor-detail-modal">
        {loading ? (
          <p className="decor-detail-modal-loading">Chargement…</p>
        ) : !decor ? (
          <p className="decor-detail-modal-error">Décor introuvable.</p>
        ) : (
          <>
            <header className="decor-detail-modal-header">
              <h2 className="decor-detail-modal-title">{decor.name}</h2>
              {studio && (
                <div className="decor-detail-modal-studio">
                  <Building2 size={18} />
                  <span>{studio.name}</span>
                  {studio.location && (
                    <span className="decor-detail-modal-location">
                      <MapPin size={14} />
                      {studio.location}
                    </span>
                  )}
                </div>
              )}
            </header>

            {decor.full_description && (
              <div className="decor-detail-modal-description">
                <p>{decor.full_description}</p>
              </div>
            )}

            <div className="decor-detail-modal-meta">
              <span className="decor-detail-modal-meta-item">
                <Users size={18} />
                {decor.max_persons} personnes
              </span>
              <span className="decor-detail-modal-meta-item decor-detail-modal-price">
                <DollarSign size={18} />
                {decor.hour_price} FCFA / heure
              </span>
            </div>

            {medias.length > 0 && (
              <div className="decor-detail-modal-gallery">
                <h3 className="decor-detail-modal-gallery-title">Galerie</h3>
                <div className="decor-detail-modal-gallery-grid">
                  {medias.map((img) => (
                    <div key={img.id} className="decor-detail-modal-gallery-item">
                      <img src={img.file_url} alt={decor.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="decor-detail-modal-actions">
              <button type="button" className="decor-detail-modal-btn-cancel" onClick={onClose}>
                Fermer
              </button>
              <button type="button" className="decor-detail-modal-btn-reserve" onClick={() => onReserve(decor)}>
                Réserver ce décor
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default DecorDetailModal;
