import { useState } from "react";
import { Users, DollarSign } from "lucide-react";
import "./DecorCard.css";
import Modal from "../modal/Modal";

const DecorCard = ({ decor, onSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Déterminer la disposition des images selon leur nombre
  const getImageLayout = (images) => {
    if (!images || images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div className="decor-image-single">
          <img src={images[0].file_url} alt={decor.name} />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="decor-images-grid decor-images-2">
          {images.map((img) => (
            <img key={img.id} src={img.file_url} alt={decor.name} />
          ))}
        </div>
      );
    }

    // Pour 3+ images : grille optimisée
    return (
      <div className="decor-images-grid decor-images-multi">
        {images.slice(0, 4).map((img, index) => (
          <div
            key={img.id}
            className={`decor-image-item ${index === 0 ? 'decor-image-main' : 'decor-image-secondary'}`}
          >
            <img src={img.file_url} alt={decor.name} />
            {images.length > 4 && index === 3 && (
              <div className="decor-image-overlay">
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="decor-card">
        <div className="decor-images-container" onClick={() => setModalOpen(true)}>
          {getImageLayout(decor.pub_medias_details)}
          <div className="decor-images-overlay">
            <span className="decor-view-more">Voir toutes les photos</span>
          </div>
        </div>

        <div className="decor-content">
          <h3 className="decor-title">{decor.name}</h3>
          <p className="decor-description">{decor.short_description}</p>
          <div className="decor-details">
            <span className="decor-capacity">
              <Users size={16} className="decor-icon" />
              {decor.max_persons} personnes
            </span>
            <span className="decor-price">
              <DollarSign size={16} className="decor-icon" />
              {decor.hour_price} F/h
            </span>
          </div>
          <button className="decor-select-btn" onClick={onSelect}>
            Choisir
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="decor-modal-header">
            <h2>{decor.name}</h2>
            <p className="decor-modal-description">{decor.full_description}</p>
          </div>

          <div className="decor-modal-details">
            <div className="decor-modal-info">
              <span className="decor-modal-capacity">
                <Users size={18} className="decor-icon" />
                Capacité : {decor.max_persons} personnes
              </span>
              <span className="decor-modal-price">
                <DollarSign size={18} className="decor-icon" />
                Prix : {decor.hour_price} FCFA/heure
              </span>
            </div>
          </div>

          <div className="decor-gallery">
            {decor.pub_medias_details.map((img, index) => (
              <div key={img.id} className="decor-gallery-item">
                <img src={img.file_url} alt={`${decor.name} - Photo ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="decor-modal-actions">
            <button className="decor-modal-select-btn" onClick={() => {
              onSelect();
              setModalOpen(false);
            }}>
              Réserver ce décor
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DecorCard;
