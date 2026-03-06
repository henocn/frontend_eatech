import { useState, useEffect } from "react";
import { Users, DollarSign, MapPin, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "../modal/Modal";
import { getDecorById } from "../../services/decorService";
import "./DecorDetailModal.css";

/**
 * Modal de détail d’un décor (studio, description, galerie carousel).
 */
function DecorDetailModal({ decorId, initialDecor, onClose, onReserve }) {
  const [decor, setDecor] = useState(initialDecor || null);
  const [loading, setLoading] = useState(!initialDecor?.studio_details);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!decorId) return;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getDecorById(decorId);
        setDecor(data);
        setGalleryIndex(0);
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
  const currentMedia = medias[galleryIndex];

  const goPrev = () => {
    setGalleryIndex((i) => (i <= 0 ? medias.length - 1 : i - 1));
  };
  const goNext = () => {
    setGalleryIndex((i) => (i >= medias.length - 1 ? 0 : i + 1));
  };

  return (
    <Modal isOpen={true} onClose={onClose} className="modal-content--tall">
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
                <p className="decor-detail-modal-studio">
                  <Building2 size={16} />
                  <span>{studio.name}</span>
                  {studio.location && (
                    <span className="decor-detail-modal-location">
                      <MapPin size={14} />
                      {studio.location}
                    </span>
                  )}
                </p>
              )}
            </header>

            {decor.full_description && (
              <p className="decor-detail-modal-description">{decor.full_description}</p>
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
                <div className="decor-detail-modal-carousel">
                  {medias.length > 1 && (
                    <button
                      type="button"
                      className="decor-detail-modal-carousel-btn decor-detail-modal-carousel-prev"
                      onClick={goPrev}
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={28} />
                    </button>
                  )}
                  <img
                    src={currentMedia?.file_url}
                    alt={`${decor.name} - ${galleryIndex + 1}`}
                    className="decor-detail-modal-carousel-image"
                  />
                  {medias.length > 1 && (
                    <button
                      type="button"
                      className="decor-detail-modal-carousel-btn decor-detail-modal-carousel-next"
                      onClick={goNext}
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={28} />
                    </button>
                  )}
                </div>
                {medias.length > 1 && (
                  <p className="decor-detail-modal-carousel-counter">
                    {galleryIndex + 1} / {medias.length}
                  </p>
                )}
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
